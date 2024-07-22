'use client'

// services/apiService.ts
import Cookies from 'js-cookie';
import { notification } from 'antd';

const API_BASE_URL_BACKEND = 'http://localhost:8080/api';
const API_BASE_URL_BFF = 'http://localhost:8081/api/proxy/forward'


export const apiService = {
  get: async (url: string) => {
    const token = Cookies.get('accessToken'); // Adjust the token retrieval logic as needed
    // console.log(token);
    const response = await fetch(`${API_BASE_URL_BFF}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });
    return handleResponse(response);
  },
  
  post: async (url: string, body?: any) => {
    const token = Cookies.get('accessToken');
    // console.log(token);
    const response = await fetch(`${API_BASE_URL_BFF}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: body? JSON.stringify(body): null,
    });
    return handleResponse(response);
  },

  delete: async (url: string) => {
    let token = Cookies.get('accessToken');
    // console.log(token);
    
    const response = await fetch(`${API_BASE_URL_BFF}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    });
    return handleResponse(response);
  },    
  
  // Add other HTTP methods (PUT, DELETE) as needed
};

type NotificationType = 'success' | 'error' | 'info' | 'warning';

export const showNotification = (
  type: NotificationType,
  message: string,
  description?: string
) => {
  notification[type]({
    message,
    description,
  });
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    showNotification('error', 'Error', error.message || 'An error occurred');
    throw new Error(error);
  }
  return response.json();
};


