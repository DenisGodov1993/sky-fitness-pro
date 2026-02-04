'use client';

import FitnessLayout from '@/app/fitness/FitnessLayout';
import { useParams } from 'next/navigation';

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  
  return (
    <FitnessLayout>
      <ProfilePage />
    </FitnessLayout>
  );
}

