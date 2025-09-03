import type { Metadata } from 'next';
import { Poppins, Lato } from 'next/font/google'; // MUDANÇA: Importando Poppins e Lato
import './globals.css';

// Configuração da fonte para títulos
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins', // Variável CSS para usar no Tailwind
});

// Configuração da fonte para texto
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato', // Variável CSS para usar no Tailwind
});

export const metadata: Metadata = {
  // MUDANÇA: Título e descrição mais apropriados
  title: 'AgroVogel - Conectividade e Automação',
  description: 'Soluções em internet rural, segurança e automação residencial.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR"> {/* MUDANÇA: Idioma para pt-BR */}
      {/* MUDANÇA: Aplicando as variáveis das fontes no body */}
      <body className={`${poppins.variable} ${lato.variable} font-lato antialiased`}>
        {/* TODO: Adicionar Navbar e Footer aqui para aparecer em todas as páginas */}
        {children}
      </body>
    </html>
  );
}