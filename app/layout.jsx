import './globals.css';

export const metadata = {
  title: 'WhatChat',
  description: 'WhatChat Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
