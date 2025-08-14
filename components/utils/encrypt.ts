import * as Crypto from 'expo-crypto';
import { SECRET_KEY } from '@env';

export function encryptPassword(password: string): string {
  try {
    const key = SECRET_KEY || 'default-key';
    let encrypted = '';

    for (let i = 0; i < password.length; i++) {
      const keyChar = key.charCodeAt(i % key.length);
      const passwordChar = password.charCodeAt(i);
      encrypted += String.fromCharCode(passwordChar ^ keyChar);
    }

    // Converter para base64
    return btoa(encrypted);
  } catch (error) {
    console.error('Erro na criptografia:', error);
    return password; 
  }
}

export function decryptPassword(encryptedData: string): string {
  try {
    const key = SECRET_KEY || 'default-key';

    // Converter de base64
    const encrypted = atob(encryptedData);
    let decrypted = '';

    for (let i = 0; i < encrypted.length; i++) {
      const keyChar = key.charCodeAt(i % key.length);
      const encryptedChar = encrypted.charCodeAt(i);
      decrypted += String.fromCharCode(encryptedChar ^ keyChar);
    }

    return decrypted;
  } catch (error) {
    console.error('Erro na descriptografia:', error);
    return encryptedData; 
  }
}
