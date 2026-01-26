import { FitCourseType } from '@/sharedTypes/sharedTypes';

export const data: FitCourseType[] = [
  {
    _id: 1,
    name: 'Йога',
    number_of_days: 25,
    duration_in_minutes: { from: 20, to: 50 },
    complexity: 3,
    image: '/skill1.png',
    stared_user: [],
  },
  {
    _id: 2,
    name: 'Стретчинг',
    number_of_days: 25,
    duration_in_minutes: { from: 20, to: 50 },
    difficulty: 3,
    image: '/skill2.png',
  },
  {
    _id: 3,
    name: 'Фитнес',
    number_of_days: 25,
    duration_in_minutes: { from: 20, to: 50 },
    difficulty: 3,
    image: '/skill3.png',
  },
  {
    _id: 4,
    name: 'Степ-аэробика',
    number_of_days: 25,
    duration_in_minutes: { from: 20, to: 50 },
    difficulty: 3,
    image: '/skill4.png',
  },
  {
    _id: 5,
    name: 'Бодифлекс',
    number_of_days: 25,
    duration_in_minutes: { from: 20, to: 50 },
    difficulty: 3,
    image: '/skill5.png',
  },
];