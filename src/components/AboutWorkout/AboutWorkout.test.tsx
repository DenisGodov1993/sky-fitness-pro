import { render, screen } from "@testing-library/react";
import AboutWorkout from "./AboutWorkout";

const workout = {
  _id: "1",
  name: "Тренировка (10)",
  video: "",
  exercises: [
    {
      _id: "ex1",
      name: "Отжимания (10)",
      quantity: 10
    }
  ]
};

test("renders workout name", () => {
  render(
    <AboutWorkout
      workout={workout}
      progress={[5]}
      onProgressButtonClick={() => {}}
    />
  );

  expect(screen.getByText("Тренировка")).toBeInTheDocument();
});

test("shows exercise progress percent", () => {
  render(
    <AboutWorkout
      workout={workout}
      progress={[5]}
      onProgressButtonClick={() => {}}
    />
  );

  expect(screen.getByText("50%")).toBeInTheDocument();
});

// import { render, screen } from '@testing-library/react';
// import AboutWorkout from './AboutWorkout';

// const workout = {
//   _id: '1',
//   name: 'Тренировка (10 повторений)',
//   video: '',
//   exercises: [
//     {
//       _id: 'ex1',
//       name: 'Отжимания (10)',
//       quantity: 10,
//     },
//   ],
// };

// test('renders workout title without repetitions', () => {
//   render(
//     <AboutWorkout
//       workout={workout}
//       progress={[5]}
//       onProgressButtonClick={() => {}}
//     />,
//   );

//   expect(screen.getByText('Тренировка')).toBeInTheDocument();
// });

// test('renders exercise name', () => {
//   render(
//     <AboutWorkout
//       workout={workout}
//       progress={[5]}
//       onProgressButtonClick={() => {}}
//     />,
//   );

//   expect(screen.getByText('Отжимания')).toBeInTheDocument();
// });

// test('shows progress percent', () => {
//   render(
//     <AboutWorkout
//       workout={workout}
//       progress={[5]}
//       onProgressButtonClick={() => {}}
//     />,
//   );

//   expect(screen.getByText('50%')).toBeInTheDocument();
// });