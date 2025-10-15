// Cambia 'profilesService' a 'profileService'
import { getProfileByUserId } from '@/modules/profiles/services/profileService';
import ProfileCard from '@/components/profiles/ProfileCard';
import Link from 'next/link';

// ...el resto del archivo sigue igual
export default async function ProfileDetailPage({ params }: { params: { userId: string } }) {
  const profile = await getProfileByUserId(Number(params.userId));

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold mb-6">Detalle del Perfil</h2>
        <ProfileCard profile={profile} />
        <div className="mt-6">
            <Link href={`/profiles/${params.userId}/edit`} className="text-blue-600 hover:underline font-semibold">
              Editar Perfil
            </Link>
        </div>
      </div>
    </div>
  );
}