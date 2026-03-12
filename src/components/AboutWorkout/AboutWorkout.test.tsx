import { render, screen } from '@testing-library/react';
import AboutWorkout from './AboutWorkout';

const workout = {
  _id: '1',
  name: 'Тренировка (10)',
  video: '',
  exercises: [
    {
      _id: 'ex1',
      name: 'Отжимания (10)',
      quantity: 10,
    },
  ],
};

test('отображение названия тренировки', () => {
  render(
    <AboutWorkout
      workout={workout}
      progress={[5]}
      onProgressButtonClick={() => {}}
    />,
  );

  expect(screen.getByText('Тренировка')).toBeInTheDocument();
});

test('отображение прогресса упражнения', () => {
  render(
    <AboutWorkout
      workout={workout}
      progress={[5]}
      onProgressButtonClick={() => {}}
    />,
  );

  expect(screen.getByText('50%')).toBeInTheDocument();
});