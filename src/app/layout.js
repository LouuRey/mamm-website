import './globals.css';
import Header from '../components/Header';

export const metadata = {
  title: 'POXPOX',
  description: 'Next.js 14 + Tailwind CSS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Prevent Ctrl+C, Ctrl+U, right click */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function () {
              document.body.addEventListener('contextmenu', function (e) {
                e.preventDefault();
              });
              document.body.addEventListener('keydown', function (e) {
                if ((e.ctrlKey || e.metaKey) && ['c', 'x', 'u'].includes(e.key.toLowerCase())) {
                  e.preventDefault();
                }
              });
            });
          `
        }} />
      </head>
      <body className="select-none">
        <Header />
        {children}
      </body>
    </html>
  );
}
