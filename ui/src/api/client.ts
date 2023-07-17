import axios, { AxiosInstance } from 'axios';

//TODO: import from .env file
const BASE_URL = 'http://localhost:3300/v1';


export const BaseClient = (userID: string): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
            "X-User-Id": userID,
        },
    });

    return axiosInstance;
}