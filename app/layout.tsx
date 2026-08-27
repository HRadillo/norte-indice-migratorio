import type { Metadata } from 'next';
import './globals.css';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export const metadata: Metadata = {
  metadataBase: new URL(isGitHubPages ? 'https://hradillo.github.io/norte-indice-migratorio/' : 'https://norte-indice-migratorio.hradillo7.chatgpt.site/'),
  title: 'Norte — Índice de Resiliencia para Migrar',
  description: 'Comparador reponderable de once ciudades canadienses, con Guadalajara como benchmark.',
  openGraph: {
    title: 'Norte — Índice de Resiliencia para Migrar',
    description: 'Once ciudades canadienses, Guadalajara como benchmark y 16 prioridades reordenables.',
    images: ['norte-social-preview.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
