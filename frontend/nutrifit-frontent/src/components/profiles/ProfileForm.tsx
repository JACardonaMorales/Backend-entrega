'use client';

import { useForm } from 'react-hook-form';
// Importa ambos tipos
import { Profile, UpdateProfileDto } from '@/modules/profiles/types';

// Modifica la interfaz para que acepte el tipo Profile
interface ProfileFormProps {
  profile: Profile;
  onSubmit: (data: UpdateProfileDto) => void;
}

export default function ProfileForm({ profile, onSubmit }: ProfileFormProps) {
  // useForm seguirá usando UpdateProfileDto para el formulario,
  // pero se inicializa con los valores del objeto profile completo.
  const { register, handleSubmit } = useForm<UpdateProfileDto>({
    defaultValues: profile,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="goal" className="block text-sm font-semibold text-gray-800">Objetivo</label>
        <input id="goal" {...register('goal')} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div>
        <label htmlFor="activityLevel" className="block text-sm font-semibold text-gray-800">Nivel de Actividad</label>
        <input id="activityLevel" {...register('activityLevel')} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div>
        <label htmlFor="weight" className="block text-sm font-semibold text-gray-800">Peso (kg)</label>
        <input id="weight" type="number" {...register('weight')} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div>
        <label htmlFor="height" className="block text-sm font-semibold text-gray-800">Altura (cm)</label>
        <input id="height" type="number" {...register('height')} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-semibold text-gray-800">Edad</label>
        <input id="age" type="number" {...register('age')} className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Guardar Cambios</button>
    </form>
  );
}