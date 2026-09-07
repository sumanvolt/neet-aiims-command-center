import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEET 2027 // AQUASHEKHAR",
  description: "Mission AIIMS Deoghar Command Center",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AIIMS NEET",
  },
};

export const viewport: Viewport = {
  themeColor: "#5b65dc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').then((reg) => {
                    reg.onupdatefound = () => {
                      const installingWorker = reg.installing;
                      if (installingWorker) {
                        installingWorker.onstatechange = () => {
                          if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            window.location.reload();
                          }
                        };
                      }
                    };
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}