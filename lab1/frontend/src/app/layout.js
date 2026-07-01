import '../styles/globals.css';

export const metadata = {
  title: 'Water Management Dashboard',
  description: 'Simple water management dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
