// profilePictureApi.js

import axios from 'axios';
import { Auth } from 'aws-amplify';

const BASE_URL = 'AWS_URL_HERE/profile-picture';

async function getAuthHeaders() {
  const session = await Auth.currentSession();
  const token = session.getIdToken().getJwtToken();
  return {
    Authorization: token,
    'Content-Type': 'application/json'
  };
}

export async function uploadProfilePicture(base64Image) {
  const headers = await getAuthHeaders();
  return axios.post(BASE_URL, { image: base64Image }, { headers });
}

export async function updateProfilePicture(base64Image) {
  const headers = await getAuthHeaders();
  return axios.put(BASE_URL, { image: base64Image }, { headers });
}

export async function deleteProfilePicture() {
  const headers = await getAuthHeaders();
  return axios.delete(BASE_URL, { headers });
}

export async function getProfilePicture() {
  const headers = await getAuthHeaders();
  return axios.get(BASE_URL, { headers });
}