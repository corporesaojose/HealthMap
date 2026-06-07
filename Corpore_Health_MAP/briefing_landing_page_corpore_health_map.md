# Briefing técnico e UX/UI  
## Landing Page Corpore Health Map  
### Mobile First + Desktop

## 1. Objetivo da página

Criar uma landing page premium, moderna, clean e altamente responsiva para o projeto Corpore Health Map.

A página deve transmitir:

- Ciência
- Tecnologia
- Medicina do Estilo de Vida
- Cuidado humano
- Prevenção
- Sofisticação
- Clareza
- Confiança

O objetivo principal da página é gerar leads qualificados para o Health Map, levando o usuário a preencher uma avaliação gratuita sobre os pilares da saúde, energia e estilo de vida.

CTA principal:

**Fazer meu Health Map gratuitamente**

CTA secundário, quando necessário:

**Quero entender minha saúde agora**

---

# 2. Direção visual

## Estilo geral

A landing page deve seguir exatamente a ideia visual do layout aprovado:

- Fundo claro
- Design mobile first
- Cards arredondados
- Sombra muito suave
- Ícones lineares modernos
- Visual de wellness + tecnologia + medicina
- Uso de glassmorphism leve em alguns cards
- Imagens 3D sutis e elementos médicos/wellness
- Muito respiro visual
- Hierarquia clara
- Sensação premium, mas acolhedora

A página não deve parecer uma landing page agressiva de vendas.  
Ela deve parecer uma experiência de diagnóstico inteligente, científica e humana.

---

# 3. Paleta de cores

Utilizar as cores abaixo como design tokens globais.

## Paleta principal

```css
:root {
  --color-lime: #D7E94A;
  --color-petroleum: #0D2B2B;
  --color-teal: #2F6F6E;
  --color-sage: #A6B8A9;
  --color-off-white: #F7F8F6;
  --color-mist-gray: #E6E9E5;

  --color-blue-clinical: #E6F0F7;
  --color-lavender-soft: #EDE9F7;
  --color-sand-light: #F4EFE6;
  --color-peach-soft: #FFE9DC;
  --color-gray-light: #D8DDE1;
  --color-blue-mist: #B7C6D6;

  --gradient-main: linear-gradient(135deg, #0D2B2B 0%, #2F6F6E 100%);
  --gradient-lime: linear-gradient(135deg, #D7E94A 0%, #F2F8C9 100%);
  --gradient-soft: linear-gradient(135deg, #F7F8F6 0%, #E6ECE6 100%);
}
```

## Uso das cores

### Verde petróleo `#0D2B2B`

Usar em:

- Títulos principais
- Botões principais
- Cards institucionais
- Rodapé visual
- Ícones importantes
- Seções de contraste

### Lima Corpore `#D7E94A`

Usar em:

- Destaques de palavras
- Pequenos marcadores
- Score circular
- Detalhes de botões
- Ícones secundários
- Microinterações

Não usar em grandes blocos de texto.

### Teal médico `#2F6F6E`

Usar em:

- Gráficos
- Ícones
- Subtítulos
- Bordas ativas
- Elementos científicos

### Sálvia suave `#A6B8A9`

Usar em:

- Backgrounds suaves
- Cards wellness
- Divisórias
- Ícones de apoio

### Off-white clínico `#F7F8F6`

Usar como fundo principal da página.

---

# 4. Tipografia

## Sugestão principal

Usar Google Fonts:

- Headings: `Sora`
- Body: `Inter`

```css
body {
  font-family: 'Inter', sans-serif;
}

h1, h2, h3, .display {
  font-family: 'Sora', sans-serif;
}
```

## Hierarquia tipográfica mobile

```css
h1 {
  font-size: 2.35rem;
  line-height: 1.05;
  letter-spacing: -0.04em;
  font-weight: 700;
}

h2 {
  font-size: 1.75rem;
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-weight: 700;
}

h3 {
  font-size: 1.125rem;
  line-height: 1.25;
  font-weight: 650;
}

p {
  font-size: 1rem;
  line-height: 1.65;
}

.small-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
}
```

## Hierarquia tipográfica desktop

```css
@media (min-width: 1024px) {
  h1 {
    font-size: 4rem;
    line-height: 1.02;
  }

  h2 {
    font-size: 2.5rem;
    line-height: 1.08;
  }

  h3 {
    font-size: 1.25rem;
  }

  p {
    font-size: 1.05rem;
  }
}
```

---

# 5. Estrutura técnica recomendada

## Stack sugerida

Recomendo criar em:

- Next.js
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod, caso tenha formulário
- Framer Motion para microanimações sutis
- Lucide React para ícones
- Deploy em Vercel

## Instalação sugerida

```bash
npx create-next-app@latest corpore-health-map --typescript --tailwind --eslint
cd corpore-health-map
npm install lucide-react framer-motion react-hook-form zod @hookform/resolvers
```

## Estrutura de pastas sugerida

```txt
src/
  app/
    page.tsx
    layout.tsx
    globals.css

  components/
    layout/
      Header.tsx
      Footer.tsx

    sections/
      HeroSection.tsx
      ProblemSection.tsx
      WhatIsHealthMapSection.tsx
      PreviewResultsSection.tsx
      ScienceTechnologySection.tsx
      ProfilesSection.tsx
      InstitutionalSection.tsx
      FaqSection.tsx
      FinalCtaSection.tsx

    ui/
      Button.tsx
      Card.tsx
      SectionLabel.tsx
      IconBadge.tsx
      ScoreCircle.tsx
      RadarChartMock.tsx
      PillarCard.tsx
      ProfileCard.tsx
      Accordion.tsx

  data/
    healthMapContent.ts
    faq.ts
    profiles.ts
    pillars.ts

  assets/
    logo-corpore-health-map.svg
    logo-corpore-original.png
    hero-phone.png
    3d-wellness-object.png
    profile-executivo.png
    profile-40mais.png
    profile-equilibrio.png
```

---

# 6. Regras gerais de layout

## Mobile first

A versão mobile é prioritária.

Largura base:

```css
.page-container {
  max-width: 430px;
  margin: 0 auto;
}
```

No desktop, a página deve abrir em layout mais amplo, mantendo o mesmo conteúdo, mas reorganizando os blocos em grid.

```css
.desktop-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 32px;
}
```

## Espaçamento mobile

```css
section {
  padding: 56px 20px;
}

.card {
  border-radius: 24px;
  padding: 24px;
}
```

## Espaçamento desktop

```css
@media (min-width: 1024px) {
  section {
    padding: 96px 0;
  }

  .two-column-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: center;
  }
}
```

---

# 7. Logo

## Uso correto

Utilizar o logo da Corpore Health Map com símbolo em lima e texto em verde petróleo.

No topo da landing page, usar versão horizontal:

- Símbolo Corpore à esquerda
- Texto “CORPORE”
- Subtexto “HEALTH MAP”

No bloco institucional escuro, usar versão negativa ou adaptar o texto para branco com símbolo lima.

## Header mobile

Elementos:

- Logo à esquerda
- Menu hambúrguer à direita
- Header transparente ou off-white com blur suave
- Posição sticky opcional

```html
<header>
  <a href="#hero" aria-label="Corpore Health Map">
    <img src="/logo-corpore-health-map.svg" alt="Corpore Health Map" />
  </a>

  <button aria-label="Abrir menu">
    <Menu />
  </button>
</header>
```

---

# 8. Organização semântica da página

A página deve ter apenas um `h1`.

Todos os blocos principais devem usar `section`.

Estrutura semântica:

```html
<main>
  <section id="hero" aria-labelledby="hero-title">
    <h1 id="hero-title">...</h1>
  </section>

  <section id="problema" aria-labelledby="problem-title">
    <h2 id="problem-title">...</h2>
  </section>

  <section id="health-map" aria-labelledby="health-map-title">
    <h2 id="health-map-title">...</h2>
  </section>

  <section id="preview" aria-labelledby="preview-title">
    <h2 id="preview-title">...</h2>
  </section>

  <section id="science" aria-labelledby="science-title">
    <h2 id="science-title">...</h2>
  </section>

  <section id="profiles" aria-labelledby="profiles-title">
    <h2 id="profiles-title">...</h2>
  </section>

  <section id="about" aria-labelledby="about-title">
    <h2 id="about-title">...</h2>
  </section>

  <section id="faq" aria-labelledby="faq-title">
    <h2 id="faq-title">...</h2>
  </section>

  <section id="final-cta" aria-labelledby="final-cta-title">
    <h2 id="final-cta-title">...</h2>
  </section>
</main>
```

---

# 9. Blocos da landing page

## BLOCO 1 — Hero Section

### Objetivo

Gerar impacto imediato, identificação emocional e clareza da promessa.

### Hierarquia

- Label pequeno: `CORPORE HEALTH MAP`
- H1: frase principal
- Subheadline explicativa
- Lista curta dos pilares
- CTA principal
- Microcopy de segurança
- Visual principal com mockup de celular/score
- Cards pequenos de apoio

### Conteúdo

Label:

**CORPORE HEALTH MAP**

H1:

**Seu corpo pode estar pedindo ajuda… mesmo que você ainda consiga “dar conta”**

No H1, destacar “dar conta” com a cor lima Corpore.

Subheadline:

**Descubra gratuitamente como estão seu sono, energia, estresse, alimentação, dores e os principais pilares da sua saúde em um mapa personalizado construído com as diretrizes da Medicina do Estilo de Vida.**

Lista de benefícios:

- Sono
- Energia
- Estresse
- Alimentação
- Dores
- Pilares da saúde

CTA:

**Fazer meu Health Map gratuitamente**

Microcopy abaixo do botão:

**Avaliação gratuita • 100% online • Resultado personalizado**

Cards abaixo ou sobrepostos ao mockup:

- Avaliação baseada em ciência
- Resultado rápido e personalizado
- Privacidade e segurança dos dados

### Layout mobile

Ordem:

1. Logo/header
2. H1
3. Subheadline
4. Lista com check
5. CTA
6. Microcopy
7. Imagem/mockup do celular
8. Cards de confiança

### Layout desktop

Hero em duas colunas:

- Esquerda: texto, CTA, microcopy
- Direita: mockup do celular, score e elementos 3D

Background com gradiente suave:

```css
background: radial-gradient(circle at top right, rgba(215, 233, 74, 0.18), transparent 35%),
            linear-gradient(135deg, #F7F8F6 0%, #EAF1EE 100%);
```

---

## BLOCO 2 — Identificação do problema

### Objetivo

Criar identificação emocional sem alarmismo.

### Hierarquia

- Label: `O PROBLEMA`
- H2
- Texto introdutório
- Lista de sintomas/sinais
- Caixa de alerta suave
- Cards emocionais

### Conteúdo

Label:

**O PROBLEMA**

H2:

**A maioria das pessoas não está doente. Está apenas vivendo cansada há tempo demais.**

Texto:

**Trabalho. Responsabilidades. Pressão. Pouco tempo. Sono ruim. Estresse constante.**

Complemento:

**Com o tempo, muitas pessoas começam a achar normal:**

Lista:

- Viver cansadas
- Perder energia
- Sentir dores
- Começar e parar rotinas
- Dormir mal
- Sentir que o corpo já não responde igual

Caixa de destaque:

**O problema é que nem sempre estar funcionando significa estar saudável.**

**E muitas vezes o corpo começa a dar sinais muito antes da doença aparecer.**

### Cards emocionais

#### Card 1

H3:

**Trabalhador Sobrecarregado**

Texto:

**Você dá conta de tudo… mas sente que está constantemente cansado.**

#### Card 2

H3:

**40+ em alerta**

Texto:

**O corpo já não recupera como antes. E a energia diminuiu nos últimos anos.**

#### Card 3

H3:

**Começa e para**

Texto:

**Você sabe o que precisa fazer… mas não consegue manter constância.**

#### Card 4

H3:

**Saúde no automático**

Texto:

**Você funciona bem. Mas sente que deixou de cuidar verdadeiramente de você.**

### Layout

Mobile:

- Cards em grid 2x2 ou carrossel horizontal

Desktop:

- Texto à esquerda
- Cards em grid à direita ou abaixo em 4 colunas

---

## BLOCO 3 — O que é o Health Map

### Objetivo

Explicar o produto de forma clara, simples e confiável.

### Hierarquia

- Label: `O QUE É O HEALTH MAP`
- H2
- Texto explicativo
- Lista “O que você vai descobrir”
- Card de fechamento

### Conteúdo

Label:

**O QUE É O HEALTH MAP**

H2:

**Mais do que um teste. Uma visão clara sobre como está sua saúde hoje.**

Texto:

**O Health Map é uma análise moderna de saúde e estilo de vida baseada nos pilares da Medicina do Estilo de Vida.**

H3:

**O que você vai descobrir**

Itens:

1. **Score dos pilares da Medicina do Estilo de Vida**
   - Alimentação Saudável
   - Atividade Física
   - Sono Reparador
   - Controle de Substâncias Tóxicas
   - Gestão do Estresse
   - Conexões Sociais

2. **Identificação dos principais gargalos da sua saúde**

3. **Interpretação baseada em Medicina do Estilo de Vida**

4. **Recomendações iniciais para melhorar sua qualidade de vida**

Card final:

**Tudo isso de forma gratuita, rápida, acolhedora, personalizada e baseada em ciência e comportamento humano.**

### Observação UX

Evitar excesso de texto corrido.  
Transformar os itens em cards com ícones.

---

## BLOCO 4 — Prévia do resultado

### Objetivo

Mostrar visualmente o valor entregue pelo Health Map.

### Hierarquia

- Label: `UMA PRÉVIA DO QUE REVELAMOS`
- H2
- Card de score
- Card radar
- Cards dos pilares
- Texto explicativo

### Conteúdo

Label:

**UMA PRÉVIA DO QUE REVELAMOS**

H2:

**Dados que revelam. Insights que transformam.**

Card 1:

**Score de Saúde**

Exemplo visual:

- Score: 82
- Status: Muito bom
- Variação: +12 vs. anterior

Card 2:

Radar com pilares:

- Sono
- Energia
- Estresse
- Alimentação
- Conexões
- Movimento

Card 3:

**Pilares do Health Map**

Itens:

- Sono: 85
- Energia: 78
- Estresse: 68
- Alimentação: 82
- Conexões: 75
- Movimento: 80

Texto inferior:

**Entenda, priorize e evolua com base em evidências.**

### Observação técnica

O gráfico pode ser inicialmente mockado em SVG ou CSS.  
Não precisa integrar biblioteca de gráfico na primeira versão.

---

## BLOCO 5 — Ciência + Tecnologia

### Objetivo

Reforçar credibilidade, ciência e uso responsável da IA.

### Hierarquia

- Label: `CIÊNCIA QUE GUIA CADA DECISÃO`
- H2
- Texto explicativo
- Cards de diferenciais

### Conteúdo

Label:

**CIÊNCIA QUE GUIA CADA DECISÃO**

H2:

**Tecnologia para personalizar. Ciência para orientar. Cuidado humano para transformar.**

Texto principal:

**O Corpore Health Map foi desenvolvido com base nos pilares da Medicina do Estilo de Vida, área da medicina focada em prevenção, comportamento e qualidade de vida.**

Texto complementar:

**A inteligência artificial é utilizada apenas para acelerar e personalizar a experiência. O mais importante continua sendo o conhecimento científico, o comportamento humano e a interpretação prática da vida real.**

### Cards

#### Card 1

H3:

**Medicina do Estilo de Vida**

Texto:

**Uma abordagem baseada em prevenção, comportamento e qualidade de vida.**

#### Card 2

H3:

**Tecnologia Inteligente**

Texto:

**A IA ajuda a organizar informações e personalizar a leitura dos seus dados.**

#### Card 3

H3:

**Visão do Todo**

Texto:

**Sono, energia, estresse, alimentação, movimento e conexões analisados em conjunto.**

#### Card 4

H3:

**Recomendações Práticas**

Texto:

**Orientações iniciais para você entender por onde começar.**

---

## BLOCO 6 — Perfis reais

### Objetivo

Aumentar identificação do usuário.

### Hierarquia

- Label: `PERFIS REAIS`
- H2
- Texto introdutório
- Cards de perfis

### Conteúdo

Label:

**PERFIS REAIS**

H2:

**Talvez você se identifique com algum desses perfis.**

Texto:

**A maioria das pessoas espera a saúde piorar para começar a cuidar dela. O objetivo do Health Map é justamente o contrário: ajudar você a perceber sinais silenciosos antes que eles se transformem em problemas maiores.**

### Cards de perfis

#### Perfil 1

H3:

**Profissional Sobrecarregado**

Texto:

**Você trabalha muito, resolve tudo, mantém a rotina funcionando… mas sente que está constantemente cansado, acelerado e com pouca recuperação.**

#### Perfil 2

H3:

**40+ em Alerta Funcional**

Texto:

**Seu corpo ainda responde. Mas você percebe que a energia mudou, o sono piorou, as dores aumentaram e recuperar já não é tão fácil quanto antes.**

#### Perfil 3

H3:

**Começa e Para**

Texto:

**Você sabe exatamente o que precisa fazer. Mas sente dificuldade de manter constância no meio da rotina, trabalho, estresse e responsabilidades.**

#### Perfil 4

H3:

**Saúde no Automático**

Texto:

**Você continua funcionando normalmente. Mas sente que deixou de cuidar verdadeiramente da própria saúde nos últimos anos.**

#### Perfil 5

H3:

**Energia em Queda**

Texto:

**Você consegue dar conta. Mas sente menos disposição, menos motivação, mais cansaço, mais desgaste mental e menos energia para viver o dia com qualidade.**

### Layout

Mobile:

- Cards verticais
- Imagem pequena à esquerda ou topo
- Texto à direita/baixo

Desktop:

- Grid de 3 cards na primeira linha
- 2 cards centralizados na segunda linha
- Ou carrossel horizontal com scroll suave

---

## BLOCO 7 — Sobre a Corpore

### Objetivo

Conectar o Health Map à autoridade da Corpore.

### Hierarquia

- Card escuro premium
- Logo Corpore Health Map
- H2
- Texto
- Ícones de confiança

### Conteúdo

Label:

**SOBRE A CORPORE**

H2:

**Ciência. Cuidado. Propósito.**

Texto:

**A Corpore Health Map nasceu para transformar dados em decisões e decisões em vida. Unimos tecnologia, Medicina do Estilo de Vida e acolhimento para ajudar você no caminho da sua melhor versão.**

Ícones:

- Equipe especializada
- Tecnologia segura e confiável
- Abordagem integrativa
- Foco em prevenção e longevidade

### Layout

Card com fundo verde petróleo e gradiente teal.

```css
background: linear-gradient(135deg, #0D2B2B 0%, #164646 100%);
color: #FFFFFF;
```

Usar detalhes em lima.

---

## BLOCO 8 — Perguntas frequentes

### Objetivo

Reduzir objeções e aumentar clareza.

### Hierarquia

- Label: `DÚVIDAS FREQUENTES`
- H2
- Accordion

### Conteúdo sugerido

H2:

**Perguntas frequentes**

FAQ 1:

**Como funciona o Health Map?**

Resposta:

**Você responde a uma avaliação online sobre hábitos, rotina, energia, sono, estresse, alimentação, dores e outros pilares da sua saúde. A partir disso, geramos uma leitura personalizada para ajudar você a entender seus principais pontos de atenção.**

FAQ 2:

**Quais exames são utilizados?**

Resposta:

**Nesta primeira etapa, o Health Map utiliza informações comportamentais e de estilo de vida. Caso existam exames ou dados adicionais, eles podem ajudar em uma análise mais completa posteriormente.**

FAQ 3:

**Em quanto tempo recebo o resultado?**

Resposta:

**Após preencher a avaliação, você recebe uma leitura personalizada com os principais pontos do seu mapa de saúde.**

FAQ 4:

**O acompanhamento está incluso?**

Resposta:

**O Health Map é uma primeira leitura gratuita. Depois dela, a equipe da Corpore poderá orientar os próximos passos de acordo com seus objetivos e necessidades.**

FAQ 5:

**Meus dados estão seguros?**

Resposta:

**Sim. As informações devem ser tratadas com privacidade, segurança e responsabilidade, sendo utilizadas apenas para gerar sua análise e orientar sua experiência.**

---

## BLOCO 9 — CTA final

### Objetivo

Converter o usuário após a construção de valor.

### Hierarquia

- Card visual com gradiente claro
- H2
- Texto
- CTA
- Microcopy de segurança

### Conteúdo

H2:

**Você continua dando conta. Mas talvez esteja na hora de voltar a cuidar de você também.**

Texto:

**Faça gratuitamente seu Corpore Health Map e descubra como estão os pilares da sua saúde, energia e estilo de vida.**

CTA:

**Fazer meu Health Map gratuitamente**

Microcopy:

**100% online • Seguro e sigiloso • Suporte humano**

---

# 10. Componentes principais

## Button

Estados:

- Default
- Hover
- Active
- Loading
- Disabled

Botão principal:

```css
.button-primary {
  background: #0D2B2B;
  color: #FFFFFF;
  border-radius: 999px;
  padding: 14px 22px;
  font-weight: 700;
  box-shadow: 0 12px 28px rgba(13, 43, 43, 0.18);
}
```

Hover:

```css
.button-primary:hover {
  background: #164646;
  transform: translateY(-1px);
}
```

## Card

```css
.card {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(13, 43, 43, 0.08);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(13, 43, 43, 0.06);
  backdrop-filter: blur(12px);
}
```

## SectionLabel

```tsx
<span className="section-label">O PROBLEMA</span>
```

```css
.section-label {
  color: #2F6F6E;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 800;
}
```

---

# 11. SEO e metadados

## Title

**Corpore Health Map | Seu mapa inteligente de saúde e bem-estar**

## Description

**Descubra gratuitamente como estão seu sono, energia, estresse, alimentação, dores e os principais pilares da sua saúde com o Corpore Health Map.**

## Open Graph

```ts
export const metadata = {
  title: "Corpore Health Map | Seu mapa inteligente de saúde e bem-estar",
  description:
    "Descubra gratuitamente como estão seu sono, energia, estresse, alimentação, dores e os principais pilares da sua saúde.",
  openGraph: {
    title: "Corpore Health Map",
    description:
      "Uma avaliação gratuita, personalizada e baseada nos pilares da Medicina do Estilo de Vida.",
    images: ["/og-corpore-health-map.jpg"],
  },
};
```

---

# 12. Acessibilidade

Obrigatório:

- Contraste adequado entre texto e fundo
- Apenas um H1
- Botões com `aria-label` quando necessário
- Imagens com `alt`
- Accordion acessível com `aria-expanded`
- Navegação por teclado
- Tamanho mínimo de fonte 16px no body
- Área de clique mínima de 44px
- Evitar textos longos em caixa alta

Exemplo de alt:

```html
<img 
  src="/hero-phone.png" 
  alt="Prévia visual do Corpore Health Map exibindo score de saúde e pilares de bem-estar"
/>
```

---

# 13. Performance

Obrigatório:

- Imagens em WebP ou AVIF
- Lazy loading em imagens abaixo da dobra
- Uso de `next/image`
- SVG para ícones
- Evitar bibliotecas pesadas de gráfico na primeira versão
- CSS otimizado com Tailwind
- Lighthouse acima de 90 em mobile

---

# 14. Animações

Usar animações sutis, nunca exageradas.

Sugestões:

- Fade up nos blocos ao entrar na viewport
- Pequeno movimento flutuante no mockup do celular
- Hover suave nos cards
- Expansão suave no FAQ
- Score circular animando de 0 até 82

Exemplo com Framer Motion:

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.55, ease: "easeOut" }}
  viewport={{ once: true }}
>
  ...
</motion.div>
```

---

# 15. Conversão e UX

## CTAs obrigatórios

Inserir CTA nos seguintes pontos:

1. Hero
2. Após bloco “O que é o Health Map”
3. Card institucional escuro
4. CTA final

Todos devem levar para o formulário ou próxima etapa:

```html
<a href="#formulario">Fazer meu Health Map gratuitamente</a>
```

Caso o formulário esteja em outra URL:

```html
<a href="/health-map/formulario">Fazer meu Health Map gratuitamente</a>
```

## Microcopy de segurança

Usar próximo aos CTAs:

- Avaliação gratuita
- 100% online
- Seguro e sigiloso
- Resultado personalizado
- Suporte humano

---

# 16. Formulário

Caso o formulário esteja dentro da landing page, criar uma seção final com id `formulario`.

Campos sugeridos:

- Nome
- WhatsApp
- E-mail
- Idade
- Principal objetivo
- Principal dificuldade hoje

Botão:

**Receber meu Health Map**

Mensagem de privacidade:

**Seus dados serão usados apenas para gerar sua análise e orientar sua experiência com a Corpore.**

---

# 17. Checklist de entrega

O programador deve entregar:

- Landing page mobile first
- Versão desktop responsiva
- Componentização limpa
- Código em TypeScript
- Uso de design tokens
- Imagens otimizadas
- SEO configurado
- Acessibilidade básica aplicada
- CTAs funcionais
- Performance otimizada
- Layout fiel à referência visual
- Logo correto aplicado
- Paleta oficial aplicada
- Conteúdo revisado conforme briefing
- Deploy em ambiente de homologação

---

# 18. Critérios de aprovação

A landing page será aprovada se cumprir:

1. Visual premium, clean e sofisticado
2. Sensação de medicina, wellness e tecnologia
3. Excelente leitura no mobile
4. Hierarquia clara de H1, H2 e H3
5. CTAs bem distribuídos
6. Página leve e rápida
7. Layout fiel à referência aprovada
8. Logo Corpore Health Map aplicado corretamente
9. Cores alinhadas à paleta oficial
10. Conteúdo emocional, claro e confiável
