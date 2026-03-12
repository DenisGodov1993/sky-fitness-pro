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

  test('should return initial state', () => {
    const state = authSliceReducer(undefined, { type: '' });

    expect(state).toEqual(initialState);
  });

  test('should set user', () => {
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

  test('should clear user', () => {
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

  test('should add selected course', () => {
    const state = authSliceReducer(initialState, addSelectedCourse('course1'));

    expect(state.selectedCourses).toEqual(['course1']);
  });

  test('should remove selected course', () => {
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
