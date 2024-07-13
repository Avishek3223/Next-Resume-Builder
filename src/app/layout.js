import { UserDataProvider } from '@/context/UserDataContext';
import './globals.css';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import dotenv from 'dotenv';
dotenv.config();

// This function fetches the initial data on the server side
async function fetchInitialData() {
  try {
    const userData = await axios.get(`${API_BASE_URL}/get-user/avishekmishra56@gmail.com`);
    const resumeData = await axios.get(`${API_BASE_URL}/get-user/${userData.data.emailId}`);
    return {
      initialUserData: userData.data,
      initialResumeData: resumeData.data,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message || error);
    return {
      initialUserData: null,
      initialResumeData: [],
    };
  }
}

export default async function RootLayout({ children }) {
  const { initialUserData, initialResumeData } = await fetchInitialData();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <UserDataProvider initialUserData={initialUserData} initialResumeData={initialResumeData}>
          {children}
        </UserDataProvider>
      </body>
    </html>
  );
}
