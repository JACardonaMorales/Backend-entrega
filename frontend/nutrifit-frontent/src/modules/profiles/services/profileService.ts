import { Profile, UpdateProfileDto } from '../types';
import { ApiError } from '@/types/api';

// URL base de tu API (ajusta si es necesario)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Obtiene el perfil de un usuario por su ID.
 * @param userId - El ID del usuario.
 * @returns Una promesa que se resuelve con los datos del perfil.
 */
export async function getProfileByUserId(userId: number): Promise<Profile> {
  const response = await fetch(`${API_URL}/profiles/${userId}`);
  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch profile');
  }
  return response.json();
}

/**
 * Actualiza el perfil de un usuario.
 * @param userId - El ID del usuario a actualizar.
 * @param data - Los datos del perfil a actualizar.
 * @returns Una promesa que se resuelve con el perfil actualizado.
 */
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