"use client";

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { auth } from '@/components/firebaseApp';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";

const logger = console;

export const UserDataContext = createContext();

export const UserDataProvider = ({ children, initialUserData = null, initialResumeData = [] }) => {
    const [userData, setUserData] = useState(initialUserData);
    const [resumeData, setResumeData] = useState(initialResumeData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [userEmail, setUserEmail] = useState(null);
    const [uploadStatus, setUploadStatus] = useState({ uploaded: false, fileUrl: '' });
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [retrievedResumeReview, setRetrievedResumeReview] = useState({});

    const handleUploadResume = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploading(true);
            setMessage('');
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64Content = reader.result.split(',')[1];
                try {
                    const uploadResponse = await axios.post('https://ic1rqexx2c.execute-api.us-east-1.amazonaws.com/dev/upload/resume', {
                        fileName: file.name,
                        fileContent: base64Content,
                        userName: userData.displayName, // include the userName
                    });

                    setMessage('File uploaded successfully!');
                    // Directly retrieve the file after upload
                    try {
                        const retrieveResponse = await axios.get('https://ic1rqexx2c.execute-api.us-east-1.amazonaws.com/dev/get-uploaded/resume', {
                            params: {
                                fileName: `${userData.displayName}/${file.name}`, // include the userName in the file path
                            },
                        });

                        setMessage('File retrieved successfully!');
                        const fileUrl = retrieveResponse.data.fileUrl;
                        setUploadStatus({ uploaded: true, fileUrl: fileUrl });
                        setRetrievedResumeReview(retrieveResponse.data.completions);
                    } catch (retrieveError) {
                        console.error('Error retrieving file:', retrieveError);
                        setMessage('File retrieve failed. Please try again.');
                        setUploadStatus({ uploaded: false, fileUrl: null });
                    }
                } catch (uploadError) {
                    console.error('Error uploading file:', uploadError);
                    setMessage('File upload failed. Please try again.');
                    setUploadStatus({ uploaded: false, fileUrl: null });
                } finally {
                    setUploading(false);
                }
            };
        }
    };

    const fetchUserData = async (email) => {
        setLoading(true);
        try {
            if (email) {
                setUserEmail(email);
                console.log("hello", email);
                // Fetch user data from API using Firebase email
                const userDataResponse = await axios.get(`${API_BASE_URL}/get-user/${email}`);
                setUserData(userDataResponse.data);
                console.log(userDataResponse)
                // Fetch resume data if user data is available
                if (userDataResponse.data && userDataResponse.data.emailId) {
                    const resumeDataResponse = await axios.get(`${API_BASE_URL}/get-user/${userDataResponse.data.emailId}`);
                    setResumeData(resumeDataResponse.data);
                }
            } else {
                logger.debug("No user currently logged in.");
            }
        } catch (error) {
            setError(error);
            logger.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const resumeDataFetch = async () => {
        try {
            const resumeDataResponse = await axios.get(`${API_BASE_URL}/get-user/${userData.emailId}`);
            setResumeData(resumeDataResponse.data);
            console.log(resumeDataResponse)
        } catch (error) {
            console.error('Error fetching resume data:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserData(user.email);
            } else {
                setUserData(null);
                setResumeData([]);
            }
        });

        return () => unsubscribe();
    }, []);

    const createUser = async (name, emailId) => {
        try {
            logger.debug("Creating user with name:", name, "and email:", emailId);
            const response = await axios.post(`${API_BASE_URL}/create-user`, { name, emailId });
            logger.debug("User created:", response.data);
        } catch (error) {
            logger.error('Error creating user:', error.message || error);
            setError(error);
        }
    };

    const updateUserData = async (updatedAttributes) => {
        if (!userData?.name || !userData?.emailId) {
            logger.error('No user data available for updating.');
            return;
        }

        try {
            logger.debug("Updating user data for:", userData.name, userData.emailId, "with attributes:", updatedAttributes);
            const response = await axios.put(`${API_BASE_URL}/update-user/${userData.name}/${userData.emailId}`, updatedAttributes);
            logger.debug("User data updated:", response.data);
            setUserData((prevState) => ({
                ...prevState,
                ...response.data
            }));
        } catch (error) {
            logger.error('Error updating user data:', error.message || error);
            setError(error);
        }
    };

    const logOut = async () => {
        router.push('/');
        try {
            await auth.signOut();
            setUserData(null);
            setResumeData([]);
            const cache = await caches.open('user-data');
            await cache.delete('user');
            logger.debug("User signed out and cache cleared.");
        } catch (error) {
            logger.error('Error signing out:', error.message || error);
            setError(error);
        }
    };

    return (
        <UserDataContext.Provider value={{
            userEmail, setUserEmail, userData, resumeData, createUser,
            updateUserData, handleUploadResume, message, uploading, uploadStatus,
            retrievedResumeReview, logOut, resumeDataFetch
        }}>
            {children}
        </UserDataContext.Provider>
    );
};
