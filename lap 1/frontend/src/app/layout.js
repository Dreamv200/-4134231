import './globals.css'

export const metadata = {
  title: 'Water Management System',
  description: 'ระบบจัดการน้ำประปาหมู่บ้าน',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
