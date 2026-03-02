'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FitnessLayout from '../FitnessLayout';
import { getMe } from '@/services/user/userApi';
import ProfileUser from '@/components/ProfileUser/ProfileUser';

export default function ProfilePage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/signin');
      return;
    }

    getMe()
      .then((data) => {
        setEmail(data.user.email);
        setSelectedCourses(data.user.selectedCourses);
      })
      .catch(() => {
        router.push('/auth/signin');
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <FitnessLayout>
      <ProfileUser username={email} userSelectedCourses={selectedCourses} />
    </FitnessLayout>
  );
}
