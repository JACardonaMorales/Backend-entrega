import { User } from "@/modules/users/types";

// Representa la estructura completa de un perfil de usuario
export interface Profile {
  id: number;
  userId: number;
  weight: number;
  height: number;
  age: number;
  goal: string;
  activityLevel: string;
  user: User;
}

// Representa los datos que se pueden enviar para actualizar un perfil
export interface UpdateProfileDto {
  weight?: number;
  height?: number;
  age?: number;
  goal?: string;
  activityLevel?: string;
}