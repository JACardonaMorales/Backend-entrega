import { Profile, UpdateProfileDto } from '../types';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getProfileByUserId(userId: number): Promise<Profile> {
  const url = `${API_URL}/profiles/${userId}`;
  console.log('🔍 Fetching profile from:', url);
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error response:', errorText);
      throw new ApiError(response.status, `Failed to fetch profile: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('✅ Profile fetched:', data);
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('❌ Network error:', error);
    throw new Error('No se pudo conectar con el servidor. ¿Está el backend corriendo?');
  }
}

export async function updateProfile(userId: number, data: UpdateProfileDto): Promise<Profile> {
  const url = `${API_URL}/profiles/${userId}`;
  console.log('📝 Updating profile at:', url);
  console.log('📦 Data to send:', data);
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ Error response:', errorData);
      throw new ApiError(response.status, errorData.message || 'Failed to update profile');
    }
    
    const updatedProfile = await response.json();
    console.log('✅ Profile updated:', updatedProfile);
    return updatedProfile;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('❌ Network error:', error);
    throw new Error('No se pudo conectar con el servidor. ¿Está el backend corriendo?');
  }
}