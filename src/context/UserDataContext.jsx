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

    const { data: resumeDataResponse, error: resumeDataError } = useSWR(
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
            logger.debug("Fetched resume data:", resumeDataResponse);
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

    const updateUserData = async (name, emailId, updatedAttributes) => {
        if (!userData?.displayName || !userData?.emailId) {
            logger.error('No user data available for updating.');
            return;
        }

        try {
            logger.debug("Updating user data for:", userData.displayName, userData.emailId, "with attributes:", updatedAttributes);
            const response = await axios.put(`${API_BASE_URL}/update-user/${userData.displayName}/${userData.emailId}`, updatedAttributes);
            logger.debug("User data updated:", response.data);
        } catch (error) {
            logger.error('Error updating user data:', error.message || error);
            setError(error);
        }
    };

    return (
        <UserDataContext.Provider value={{ userData, resumeData, createUser, updateUserData }}>
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
