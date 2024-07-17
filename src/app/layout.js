import { UserDataProvider } from '@/context/UserDataContext';
import './globals.css';
import dotenv from 'dotenv';
dotenv.config();

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserDataProvider>
          {children}
        </UserDataProvider>
      </body>
    </html>
  );
}
