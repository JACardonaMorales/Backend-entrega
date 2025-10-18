import { Profile, UpdateProfileDto } from '../types';

// --- AÑADE ESTA DEFINICIÓN DE CLASE AQUÍ ---
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}
// --- FIN DEL CÓDIGO A AÑADIR ---

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getProfileByUserId(userId: number): Promise<Profile> {
  const response = await fetch(`${API_URL}/profiles/${userId}`);
  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch profile');
  }
  return response.json();
}

export async function updateProfile(userId: number, data: UpdateProfileDto): Promise<Profile> {
  const response = await fetch(`${API_URL}/profiles/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new ApiError(response.status, errorData.message || 'Failed to update profile');
  }
  return response.json();
}