// utils/tokenService.ts
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { showNotification } from './apiService';

/**
 * Extracts the ID from the JWT token stored in cookies.
 * @returns The ID or null if token is missing or decoding fails.
 */
export const getIdFromToken = (): number | null => {
  const token = Cookies.get('accessToken'); // Adjust the key if necessary

  if (!token) {
    console.error('No token found in cookies');
    return null;
  }

  try {
    const decoded: { id: number } = jwtDecode(token);
    return decoded.id || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getPlanIdFromToken = (): number | null => {
  const token = Cookies.get('accessToken'); // Adjust the key if necessary

  if (!token) {
    console.error('No token found in cookies');
    return null;
  }

  try {
    const decoded: { plan: number } = jwtDecode(token);
    return decoded.plan || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getRoleFromToken = (): string | null => {
  const token = Cookies.get('accessToken'); // Adjust the key if necessary

  if (!token) {
    console.error('No token found in cookies');
    return null;
  }

  try {
    const decoded: { role: string } = jwtDecode(token);
    return decoded.role || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
