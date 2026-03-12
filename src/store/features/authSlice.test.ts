import {
  authSliceReducer,
  setUser,
  clearUser,
  addSelectedCourse,
  removeSelectedCourse,
} from './authSlice';

describe('authSlice', () => {
  const initialState = {
    username: '',
    token: '',
    selectedCourses: [] as string[],
  };

  test('возвращает начальное состояние', () => {
    const state = authSliceReducer(undefined, { type: '' });

    expect(state).toEqual(initialState);
  });

  test('устанавливает пользователя', () => {
    const action = setUser({
      username: 'test@test.com',
      token: '123',
      selectedCourses: ['1'],
    });

    const state = authSliceReducer(initialState, action);

    expect(state.username).toBe('test@test.com');
    expect(state.token).toBe('123');
    expect(state.selectedCourses).toEqual(['1']);
  });

  test('очищает информацию о пользователе', () => {
    const state = authSliceReducer(
      {
        username: 'test@test.com',
        token: '123',
        selectedCourses: ['1'],
      },
      clearUser(),
    );

    expect(state).toEqual(initialState);
  });

  test('добавляет выбранный курс', () => {
    const state = authSliceReducer(initialState, addSelectedCourse('course1'));

    expect(state.selectedCourses).toEqual(['course1']);
  });

  test('удаляет выбранный курс', () => {
    const state = authSliceReducer(
      {
        username: '',
        token: '',
        selectedCourses: ['course1'],
      },
      removeSelectedCourse('course1'),
    );

    expect(state.selectedCourses).toEqual([]);
  });
});