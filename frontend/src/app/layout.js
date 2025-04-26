// app/layout.js
import './globals.css'
import 'leaflet/dist/leaflet.css'

export const metadata = {
  title: 'Landmark Creator',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body>
      {children}
      </body>
      </html>
  )
}