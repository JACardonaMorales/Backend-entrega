'use client'; // <-- AÑADE ESTA LÍNEA AL INICIO DE TODO

import { useForm } from 'react-hook-form';
import { Profile, UpdateProfileDto } from '@/modules/profiles/types';

// ...el resto del archivo no cambia...

interface ProfileFormProps {
  profile: Profile;
  onSubmit: (data: UpdateProfileDto) => void;
}

export default function ProfileForm({ profile, onSubmit }: ProfileFormProps) {
  const defaultFormValues: UpdateProfileDto = {
    weight: profile.weight,
    height: profile.height,
    age: profile.age,
    goal: profile.goal,
    activityLevel: profile.activityLevel,
  };

  const { register, handleSubmit } = useForm<UpdateProfileDto>({
    defaultValues: defaultFormValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ...contenido del formulario... */}
    </form>
  );
}