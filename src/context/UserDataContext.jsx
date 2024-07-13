"use client";

import React, { createContext, useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

const logger = console;

export const UserDataContext = createContext();

const fetcher = url => axios.get(url).then(res => res.data);

export const UserDataProvider = ({ children, initialUserData, initialResumeData }) => {
    const [userData, setUserData] = useState(initialUserData);
    const [resumeData, setResumeData] = useState(initialResumeData);
    const [loading, setLoading] = useState(!initialUserData);
    const [error, setError] = useState(null);
    const [uploadStatus, setUploadStatus] = useState({ uploaded: false, fileUrl: null });
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getUserDataFromCache = async () => {
            try {
                const cache = await caches.open('user-data');
                const cachedResponse = await cache.match('user');
                if (cachedResponse) {
                    const cachedUserData = await cachedResponse.json();
                    logger.debug("Cached user data found:", cachedUserData);
                    setUserData(cachedUserData);
                } else {
                    logger.debug("No cached user data found.");
                }
            } catch (error) {
                logger.error('Error retrieving user data from cache:', error);
            }
        };

        getUserDataFromCache();
    }, []);

    const [retrivedResumeReview, setRetrivedResumeReview] = useState({})
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
                    });

                    setMessage('File uploaded successfully!');
                    const uploadedFileUrl = `https://resume-reviewe.s3.amazonaws.com/${file.name}`;

                    // Directly retrieve the file after upload
                    try {
                        const retrieveResponse = await axios.get('https://ic1rqexx2c.execute-api.us-east-1.amazonaws.com/dev/get-uploaded/resume', {
                            params: {
                                fileName: file.name,
                            },
                        });

                        setMessage('File retrieved successfully!');
                        const fileUrl = retrieveResponse.data.fileUrl;
                        setUploadStatus({ uploaded: true, fileUrl: fileUrl });
                        setRetrivedResumeReview(retrieveResponse.data.completions)
                    } catch (retrieveError) {
                        console.error('Error retrieving file:', retrieveError);
                        setMessage('File retrieve failed. Please try again.');
                        if (uploadStatus.uploaded) {
                            setUploadStatus((prevStatus) => ({
                                ...prevStatus,
                                uploaded: false
                            }));
                        }
                    }
                } catch (uploadError) {
                    console.error('Error uploading file:', uploadError);
                    setMessage('File upload failed. Please try again.');
                    if (uploadStatus.uploaded) {
                        setUploadStatus((prevStatus) => ({
                            ...prevStatus,
                            uploaded: false
                        }));
                    }
                } finally {
                    setUploading(false);
                }
            };
        }
    };

    const { data: resumeDataResponse, error: resumeDataError, mutate: resumeDataFetch } = useSWR(
        userData?.emailId ? `${API_BASE_URL}/get-user/${userData.emailId}` : null,
        fetcher,
        {
            fallbackData: initialResumeData,
            onLoadingSlow: () => setLoading(true),
            onSuccess: () => setLoading(false),
            onError: () => setLoading(false)
        }
    );

    useEffect(() => {
        if (resumeDataResponse) {
            console.log("Fetched resume data:", resumeDataResponse);
            setResumeData(resumeDataResponse);
        }
        if (resumeDataError) {
            logger.error("Error fetching resume data:", resumeDataError);
            setError(resumeDataError);
        }
    }, [resumeDataResponse, resumeDataError]);

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

    return (
        <UserDataContext.Provider value={{ userData, resumeData, createUser, updateUserData, handleUploadResume, message, uploading, uploadStatus, resumeDataFetch,retrivedResumeReview}}>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                children
            )}
        </UserDataContext.Provider>
    );
};
