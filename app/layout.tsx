import { DM_Sans } from 'next/font/google';
import './globals.css';
import { ClientProviders } from './ClientProviders';
import { FHEConsole } from '../components/FHEConsole';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata = {
  title: 'Fhish | Private FHE Layer',
  description: 'Private Voting on Initia MiniEVM',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={`${dmSans.variable} min-h-screen`}>
        <ClientProviders>
          {children}
          <FHEConsole />
        </ClientProviders>
      </body>
    </html>
  );
}
