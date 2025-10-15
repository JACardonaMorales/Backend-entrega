'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfileByUserId, updateProfile } from '@/modules/profiles/services/profileService';
import ProfileForm from '@/components/profiles/ProfileForm';
import { UpdateProfileDto, Profile } from '@/modules/profiles/types';

export default function EditProfilePage({ params }: { params: { userId: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    getProfileByUserId(Number(params.userId)).then(setProfile);
  }, [params.userId]);

  const handleSubmit = async (data: UpdateProfileDto) => {
    await updateProfile(Number(params.userId), data);
    router.push(`/profiles/${params.userId}`);
  };

  if (!profile) return <div className="text-center p-8">Cargando...</div>;

  return (
    <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-6">Editar Perfil</h2>
            <ProfileForm profile={profile} onSubmit={handleSubmit} />
        </div>
    </div>
  );
}