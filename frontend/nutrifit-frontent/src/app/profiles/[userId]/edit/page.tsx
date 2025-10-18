'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfileByUserId, updateProfile } from '@/modules/profiles/services/profileService';
import ProfileForm from '@/components/profiles/ProfileForm';
import { UpdateProfileDto, Profile } from '@/modules/profiles/types';

export default function EditProfilePage({ 
  params 
}: { 
  params: Promise<{ userId: string }> 
}) {
  const { userId } = use(params);
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getProfileByUserId(Number(userId))
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const handleSubmit = async (data: UpdateProfileDto) => {
    try {
      await updateProfile(Number(userId), data);
      router.push(`/profiles/${userId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
    }
  };

  if (isLoading) {
    return <div className="text-center p-8">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!profile) {
    return <div className="text-center p-8">Perfil no encontrado</div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6">Editar Perfil</h2>
        <ProfileForm profile={profile} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}