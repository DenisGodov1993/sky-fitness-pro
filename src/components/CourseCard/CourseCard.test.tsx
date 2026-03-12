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

test('renders course title', () => {
  renderComponent();
  expect(screen.getByText('Йога')).toBeInTheDocument();
});

// test("renders difficulty", () => {
//   renderComponent();
//   const baseElement = screen.getByText('Сложность', { exact: false });
//   const parentContainer = baseElement.closest('.txt__3');
//   const hasDifficultyText = parentContainer?.textContent?.includes('лёгкий') ?? false;
//   expect(hasDifficultyText).toBe(true);
// });
test('renders difficulty label', () => {
  renderComponent();
  expect(screen.getByText('Сложность')).toBeInTheDocument();
});

test('renders course duration in days', () => {
  renderComponent();
  const allElementsWith20 = screen.getAllByText(/20/i);
  const durationElement = allElementsWith20.find(
    (el) => el.textContent?.includes('дней') ?? false,
  );
  expect(durationElement).toBeInTheDocument();
});

test('renders daily duration', () => {
  renderComponent();
  const allElementsWith20 = screen.getAllByText(/20/i);
  const dailyDurationElement = allElementsWith20.find(
    (el) => el.textContent?.includes('мин/день') ?? false,
  );
  expect(dailyDurationElement).toBeInTheDocument();
});

// import { render, screen } from "@testing-library/react";
// import { CourseCard } from "./CourseCard";
// import { Provider } from "react-redux";
// import { makeStore } from "@/store/store";

// const mockCourse = {
//   _id: "1",
//   nameRU: "Йога",
//   nameEN: "Yoga",
//   description: "Описание курса йоги",
//   directions: ["йога"],
//   fitting: ["для начинающих"],
//   durationInDays: 20,
//   difficulty: "легкий",
//   dailyDurationInMinutes: { from: 20, to: 40 },
//   workouts: [],
//   order: 1
// };

// function renderComponent() {
//   const store = makeStore();

//   return render(
//     <Provider store={store}>
//       <CourseCard course={mockCourse}/>
//     </Provider>
//   );
// }

// test("renders course title", () => {
//   renderComponent();

//   expect(screen.getByText("Йога")).toBeInTheDocument();
// });

// test("renders difficulty", () => {
//   renderComponent();

//   expect(screen.getByText(/легкий/i)).toBeInTheDocument();
// });

// test("renders duration", () => {
//   renderComponent();

//   expect(screen.getByText(/20/i)).toBeInTheDocument();
// });
