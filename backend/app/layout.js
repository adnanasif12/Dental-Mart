import './globals.css'

export const metadata = {
  title: 'DentalMart Backend API',
  description: 'Backend API for DentalMart',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(() => {
          const originalDefine = Object.defineProperty;
          Object.defineProperty = function(obj, prop, descriptor) {
            if (obj === window && prop === 'ethereum') {
              const current = Object.getOwnPropertyDescriptor(window, 'ethereum');
              if (current && !current.configurable) {
                console.warn('Skipping window.ethereum redefine because it is not configurable.');
                return window;
              }
            }
            return originalDefine(obj, prop, descriptor);
          };
        })();` }} />
      </head>
      <body style={{ width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  )
}
