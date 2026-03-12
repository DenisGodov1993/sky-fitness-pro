import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import AboutCourse from './AboutCourse';
import { CourseApiType } from '@/sharedTypes/sharedTypes';
import { setUser } from '@/store/features/authSlice';

const mockCourse: CourseApiType = {
  _id: 'course1',
  nameRU: 'Йога',
  nameEN: 'Yoga',
  description: 'test',
  directions: ['растяжка', 'баланс', 'гибкость'],
  fitting: ['новичкам', 'для дома', 'для здоровья'],
  durationInDays: 20,
  difficulty: 'легкий',
  dailyDurationInMinutes: { from: 20, to: 40 },
  workouts: [],
  order: 1,
};

function renderAboutCourse(store: ReturnType<typeof makeStore>) {
  return render(
    <Provider store={store}>
      <AboutCourse course={mockCourse} username="test@test.com" />
    </Provider>,
  );
}

describe('AboutCourse', () => {
  test('Отображение подходящих текстов', () => {
    const store = makeStore();

    renderAboutCourse(store);

    expect(screen.getByText('новичкам')).toBeInTheDocument();
    expect(screen.getByText('для дома')).toBeInTheDocument();
  });

  test('Отображение направлений', () => {
    const store = makeStore();

    renderAboutCourse(store);

    expect(screen.getByText('растяжка')).toBeInTheDocument();
    expect(screen.getByText('баланс')).toBeInTheDocument();
  });

  test('Отображение кнопки добавления курса', () => {
    const store = makeStore();

    renderAboutCourse(store);

    expect(
      screen.getByRole('button', { name: /добавить курс/i }),
    ).toBeInTheDocument();
  });

  test('Отображение текста о добавленном курсе при его выборе', () => {
    const store = makeStore();

    store.dispatch(
      setUser({
        username: 'test@test.com',
        token: '',
        selectedCourses: ['course1'],
      }),
    );

    renderAboutCourse(store);

    expect(screen.getByText(/курс добавлен/i)).toBeInTheDocument();
  });

  test('Отображение изображения курса', () => {
    const store = makeStore();

    renderAboutCourse(store);

    const image = screen.getByAltText('Йога');

    expect(image).toBeInTheDocument();
  });
});