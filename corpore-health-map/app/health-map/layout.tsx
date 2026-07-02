import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Health Map — Avaliação de Saúde | Corpore',
  description:
    'Descubra seu Health Score em menos de 3 minutos. Avaliação gratuita baseada nos 6 pilares da Medicina do Estilo de Vida.',
  openGraph: {
    title: 'Meu Health Map | Corpore',
    description: 'Faça sua avaliação de saúde gratuita e descubra seu Health Score.',
    type: 'website',
    images: ['/og-image.png'],
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function HealthMapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
