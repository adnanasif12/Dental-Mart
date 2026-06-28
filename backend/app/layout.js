import './globals.css'

export const metadata = {
  title: 'DentalMart Backend API',
  description: 'Backend API for DentalMart',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>
      <body style={{ width: '100%', margin: 0, padding: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  )
}
