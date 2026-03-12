import { render, screen } from '@testing-library/react';
import { CourseCard } from './CourseCard';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';

const mockCourse = {
  _id: '1',
  nameRU: 'Йога',
  nameEN: 'Yoga',
  description: 'Описание курса йоги',
  directions: ['йога'],
  fitting: ['для начинающих'],
  durationInDays: 20,
  difficulty: 'лёгкий',
  dailyDurationInMinutes: { from: 20, to: 40 },
  workouts: [],
  order: 1,
};

function renderComponent() {
  const store = makeStore();
  return render(
    <Provider store={store}>
      <CourseCard course={mockCourse} />
    </Provider>,
  );
}

test('отображение названия курса', () => {
  renderComponent();
  expect(screen.getByText('Йога')).toBeInTheDocument();
});

test('отображение метки сложности', () => {
  renderComponent();
  expect(screen.getByText('Сложность')).toBeInTheDocument();
});

test('отображение продолжительности курса в днях', () => {
  renderComponent();
  const allElementsWith20 = screen.getAllByText(/20/i);
  const durationElement = allElementsWith20.find(
    (el) => el.textContent?.includes('дней') ?? false,
  );
  expect(durationElement).toBeInTheDocument();
});

test('отображение продолжительности курса', () => {
  renderComponent();
  const allElementsWith20 = screen.getAllByText(/20/i);
  const dailyDurationElement = allElementsWith20.find(
    (el) => el.textContent?.includes('мин/день') ?? false,
  );
  expect(dailyDurationElement).toBeInTheDocument();
});