import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: {
    template: '%s | GluStack',
    default: 'GluStack - DevOps, Cloud & Full-Stack Engineering',
  },
  description: 'Enterprise-grade DevOps automation, cloud-native engineering and full-stack development across AWS, Azure & GCP.',
  metadataBase: new URL('https://glustack.com'),
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            font-synthesis: none;
            text-rendering: optimizeLegibility;
          }
        `}</style>
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}