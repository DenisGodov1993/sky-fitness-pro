import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import Header from './Header';
import { setUser } from '@/store/features/authSlice';

function renderHeader(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <Header />
    </Provider>,
  );
}

describe('Header', () => {
  test('renders login button when user not logged in', () => {
    const store = makeStore();

    renderHeader(store);

    expect(screen.getByText(/войти/i)).toBeInTheDocument();
  });

  test('renders user name when logged in', () => {
    const store = makeStore();

    store.dispatch(
      setUser({
        username: 'test@test.com',
        token: '123',
        selectedCourses: [],
      }),
    );

    renderHeader(store);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('opens user menu', () => {
    const store = makeStore();

    store.dispatch(
      setUser({
        username: 'test@test.com',
        token: '123',
        selectedCourses: [],
      }),
    );

    renderHeader(store);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/мой профиль/i)).toBeInTheDocument();
  });

  test('shows logout button', () => {
    const store = makeStore();

    store.dispatch(
      setUser({
        username: 'test@test.com',
        token: '123',
        selectedCourses: [],
      }),
    );

    renderHeader(store);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText(/выйти/i)).toBeInTheDocument();
  });
});
