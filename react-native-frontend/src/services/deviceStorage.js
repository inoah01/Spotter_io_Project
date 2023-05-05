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

