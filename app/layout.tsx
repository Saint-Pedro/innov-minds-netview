import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Innov-Reseau Dashboard',
  description: 'Tableau de bord innovant pour la visualisation des performances réseau',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}