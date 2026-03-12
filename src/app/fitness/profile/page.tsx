'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FitnessLayout from '../FitnessLayout';
import { getMe } from '@/services/user/userApi';
import ProfileUser from '@/components/ProfileUser/ProfileUser';
import { useAppDispatch } from '@/store/store';
import { showError } from '@/utils/toast';
import {
  getCourseProgress,
  getCourseWorkouts,
} from '@/services/courses/coursesApi';
import {
  setAllProgress,
  setProgressLoading,
  setProgressError,
  CourseProgress,
} from '@/store/features/progressSlice';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/auth/signin');
      return;
    }

    const fetchData = async () => {
      try {
        dispatch(setProgressLoading(true));

        const data = await getMe();
        setEmail(data.user.email);
        setSelectedCourses(data.user.selectedCourses);

        const map: Record<string, CourseProgress> = {};

        for (const courseId of data.user.selectedCourses) {
          const [courseProgress, workouts] = await Promise.all([
            getCourseProgress(courseId),
            getCourseWorkouts(courseId),
          ]);

          const completedWorkouts =
            courseProgress.workoutsProgress?.filter(
              (w: { workoutCompleted: boolean }) => w.workoutCompleted,
            ).length ?? 0;

          map[courseId] = {
            courseId,
            completedWorkouts,
            totalWorkouts: workouts.length,
          };
        }

        dispatch(setAllProgress(map));
      } catch {
        showError('Ошибка загрузки прогресса');
        dispatch(setProgressError('Ошибка загрузки прогресса'));
        router.push('/auth/signin');
      } finally {
        dispatch(setProgressLoading(false));
        setLoading(false);
      }
    };

    fetchData();
  }, [router, dispatch]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <FitnessLayout>
      <ProfileUser username={email} selectedCourses={selectedCourses} />
    </FitnessLayout>
  );
}