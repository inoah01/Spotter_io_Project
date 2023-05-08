import * as SecureStore from 'expo-secure-store';

// Store token securely
export async function storeToken(token) {
  await SecureStore.setItemAsync('firebaseToken', token);
  console.log("The token is: ", token);
}

// Retrieve the token
export async function getToken() {
  const token = await SecureStore.getItemAsync('firebaseToken');
  return token;
}

// Clear token from storage
export async function removeToken() {
  try {
    await SecureStore.deleteItemAsync('firebaseToken');
    console.log("Token successfully deleted!")
  } catch (error) {
    console.error("Error removing token from device storage", error);
  }
}

