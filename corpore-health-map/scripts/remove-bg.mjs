import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const input = "./public/avaliacao-saude-online-corpore-health-map.png";
const output = "./public/avaliacao-saude-online-corpore-health-map.png";

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = new Uint8Array(data);

// O fundo da imagem é um gradiente escuro (verde petróleo / preto)
// Remove pixels onde R < 80, G < 100, B < 80 (tons escuros de petróleo/teal)
// e que estejam próximos às bordas (fundo externo ao celular)

// Primeiro: flood fill a partir das 4 bordas para identificar fundo
const visited = new Uint8Array(width * height);
const queue = [];

function idx(x, y) { return (y * width + x) * channels; }
function pIdx(x, y) { return y * width + x; }

function isBg(x, y) {
  const i = idx(x, y);
  const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
  // Fundo: tons escuros de verde petróleo/preto/teal
  return r < 90 && g < 120 && b < 100;
}

// Seed das bordas
for (let x = 0; x < width; x++) {
  if (!visited[pIdx(x, 0)] && isBg(x, 0)) { queue.push([x, 0]); visited[pIdx(x, 0)] = 1; }
  if (!visited[pIdx(x, height-1)] && isBg(x, height-1)) { queue.push([x, height-1]); visited[pIdx(x, height-1)] = 1; }
}
for (let y = 0; y < height; y++) {
  if (!visited[pIdx(0, y)] && isBg(0, y)) { queue.push([0, y]); visited[pIdx(0, y)] = 1; }
  if (!visited[pIdx(width-1, y)] && isBg(width-1, y)) { queue.push([width-1, y]); visited[pIdx(width-1, y)] = 1; }
}

// BFS flood fill
while (queue.length > 0) {
  const [x, y] = queue.pop();
  const neighbors = [[x-1,y],[x+1,y],[x,y-1],[x,y+1]];
  for (const [nx, ny] of neighbors) {
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
    if (visited[pIdx(nx, ny)]) continue;
    if (isBg(nx, ny)) {
      visited[pIdx(nx, ny)] = 1;
      queue.push([nx, ny]);
    }
  }
}

// Torna fundo transparente
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (visited[pIdx(x, y)]) {
      pixels[idx(x, y) + 3] = 0; // alpha = 0
    }
  }
}

// Suaviza bordas (anti-aliasing simples)
const result = Buffer.from(pixels);
await sharp(result, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(output.replace(".png", "-transparent.png"));

console.log("✅ Imagem com fundo transparente salva!");
