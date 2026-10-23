import { LanguageProvider } from '../lib/LanguageContext';
import './globals.css';

export const metadata = {
  title: 'Jawaharlal Nehru Quiz Competition | Congress Seva Dal',
  description:
    'A quiz competition celebrating the life, ideas and legacy of Pandit Jawaharlal Nehru — India\'s first Prime Minister. An initiative by Congress Seva Dal.',
  keywords: 'Jawaharlal Nehru, Nehru Jayanti, Congress Seva Dal, Indian National Congress, Quiz, Nehru Quiz Competition',
  openGraph: {
    title: 'Jawaharlal Nehru Quiz Competition',
    description: 'A Congress Seva Dal quiz on the life, ideas and legacy of Pandit Jawaharlal Nehru',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800;9..144,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
