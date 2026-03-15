import {
  progressSliceReducer,
  setProgressLoading,
  setAllProgress,
  updateCourseProgress,
  setProgressError,
  clearProgress,
} from './progressSlice';

describe('progressSlice', () => {
  const initialState = {
    progressMap: {},
    loading: false,
    error: null as string | null, 
  };

  test('настраивает загрузку', () => {
    const state = progressSliceReducer(initialState, setProgressLoading(true));

    expect(state.loading).toBe(true);
  });

  test('устанавливает весь прогресс', () => {
    const progress = {
      course1: {
        courseId: 'course1',
        completedWorkouts: 3,
        totalWorkouts: 10,
      },
    };

    const state = progressSliceReducer(initialState, setAllProgress(progress));

    expect(state.progressMap).toEqual(progress);
  });

  test('обновляет прогресс курса', () => {
    const progress = {
      courseId: 'course1',
      completedWorkouts: 5,
      totalWorkouts: 10,
    };

    const state = progressSliceReducer(
      initialState,
      updateCourseProgress(progress),
    );

    expect(state.progressMap['course1']).toEqual(progress);
  });

  test('устанавливает ошибки', () => {
    const state = progressSliceReducer(
      initialState,
      setProgressError('Ошибка'),
    );

    expect(state.error).toBe('Ошибка');
  });

  test('прогресс', () => {
    const state = progressSliceReducer(
      {
        progressMap: {
          course1: {
            courseId: 'course1',
            completedWorkouts: 5,
            totalWorkouts: 10,
          },
        },
        loading: false,
        error: null,
      },
      clearProgress(),
    );

    expect(state.progressMap).toEqual({});
  });
});