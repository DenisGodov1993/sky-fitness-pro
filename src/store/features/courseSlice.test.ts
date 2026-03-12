import {
  courseSliceReducer,
  setAllCourses,
  setFetchIsLoading,
  setFetchError,
} from './courseSlice';
import { CourseApiType } from '@/sharedTypes/sharedTypes';

describe('courseSlice', () => {
  const initialState = {
    currentCourse: null,
    allCourses: [] as CourseApiType[],
    fetchIsLoading: true,
    fetchError: null as string | null,
    userId: null as string | null,
  };

  const mockCourses: CourseApiType[] = [
    {
      _id: '1',
      nameRU: 'Йога',
      nameEN: 'Yoga',
      description: 'test',
      directions: ['растяжка'],
      fitting: ['для начинающих'],
      durationInDays: 20,
      difficulty: 'легкий',
      dailyDurationInMinutes: { from: 20, to: 40 },
      workouts: [],
      order: 1,
    },
  ];

  test('should set loading', () => {
    const state = courseSliceReducer(initialState, setFetchIsLoading(false));

    expect(state.fetchIsLoading).toBe(false);
  });

  test('should set courses', () => {
    const state = courseSliceReducer(initialState, setAllCourses(mockCourses));

    expect(state.allCourses).toEqual(mockCourses);
  });

  test('should set error', () => {
    const state = courseSliceReducer(initialState, setFetchError('Ошибка'));

    expect(state.fetchError).toBe('Ошибка');
  });
});