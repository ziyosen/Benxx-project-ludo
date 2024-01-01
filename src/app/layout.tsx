import './globals.css';
import React, { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}

export const metadata = {
  title: 'LUDO',
  description: 'Ludo Game',
};

export default function RootLayout({ children }: MyComponentProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
