// import { render, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { makeStore } from "@/store/store";
// import AboutCourse from "./AboutCourse";

// const mockCourse = {
//   _id: "course1",
//   nameRU: "Йога",
//   nameEN: "Yoga",
//   description: "test",
//   directions: ["растяжка", "баланс", "гибкость"],
//   fitting: ["новичкам", "для дома", "для здоровья"],
//   durationInDays: 20,
//   difficulty: "легкий",
//   dailyDurationInMinutes: { from: 20, to: 40 },
//   workouts: [],
//   order: 1
// };

// function renderComponent() {
//   const store = makeStore();

//   render(
//     <Provider store={store}>
//       <AboutCourse
//         course={mockCourse}
//         username="test@test.com"
//       />
//     </Provider>
//   );
// }

// describe("AboutCourse", () => {

//   test("renders fitting texts", () => {
//     renderComponent();

//     expect(screen.getByText("новичкам")).toBeInTheDocument();
//     expect(screen.getByText("для дома")).toBeInTheDocument();
//   });

//   test("renders directions", () => {
//     renderComponent();

//     expect(screen.getByText("растяжка")).toBeInTheDocument();
//     expect(screen.getByText("баланс")).toBeInTheDocument();
//   });

//   test("shows add course button", () => {
//     renderComponent();

//     expect(
//       screen.getByRole("button", { name: /добавить курс/i })
//     ).toBeInTheDocument();
//   });

// });

// import { render, screen } from "@testing-library/react";
// import { Provider } from "react-redux";
// import { makeStore } from "@/store/store";
// import AboutCourse from "./AboutCourse";
// import { CourseApiType } from "@/sharedTypes/sharedTypes";

// const mockCourse: CourseApiType = {
//   _id: "course1",
//   nameRU: "Йога",
//   nameEN: "Yoga",
//   description: "test",
//   directions: ["растяжка", "баланс", "гибкость"],
//   fitting: ["новичкам", "для дома", "для здоровья"],
//   durationInDays: 20,
//   difficulty: "легкий",
//   dailyDurationInMinutes: { from: 20, to: 40 },
//   workouts: [],
//   order: 1
// };

// function renderAboutCourse(
//   store: ReturnType<typeof makeStore>
// ) {
//   return render(
//     <Provider store={store}>
//       <AboutCourse
//         course={mockCourse}
//         username="test@test.com"
//       />
//     </Provider>
//   );
// }

// describe("AboutCourse", () => {

//   test("renders fitting texts", () => {

//     const store = makeStore();

//     renderAboutCourse(store);

//     expect(screen.getByText("новичкам")).toBeInTheDocument();
//     expect(screen.getByText("для дома")).toBeInTheDocument();
//   });

//   test("renders directions", () => {

//     const store = makeStore();

//     renderAboutCourse(store);

//     expect(screen.getByText("растяжка")).toBeInTheDocument();
//     expect(screen.getByText("баланс")).toBeInTheDocument();
//   });

//   test("shows add course button", () => {

//     const store = makeStore();

//     renderAboutCourse(store);

//     expect(
//       screen.getByRole("button", { name: /добавить курс/i })
//     ).toBeInTheDocument();
//   });

//   test("shows added course text when course already selected", () => {

//     const store = makeStore({
//       auth: {
//         username: "test@test.com",
//         token: "",
//         selectedCourses: ["course1"]
//       }
//     });

//     renderAboutCourse(store);

//     expect(
//       screen.getByText(/курс добавлен/i)
//     ).toBeInTheDocument();
//   });

// });

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
  test('renders fitting texts', () => {
    const store = makeStore();

    renderAboutCourse(store);

    expect(screen.getByText('новичкам')).toBeInTheDocument();
    expect(screen.getByText('для дома')).toBeInTheDocument();
  });

  test('renders directions', () => {
    const store = makeStore();

    renderAboutCourse(store);

    expect(screen.getByText('растяжка')).toBeInTheDocument();
    expect(screen.getByText('баланс')).toBeInTheDocument();
  });

  test('shows add course button', () => {
    const store = makeStore();

    renderAboutCourse(store);

    expect(
      screen.getByRole('button', { name: /добавить курс/i }),
    ).toBeInTheDocument();
  });

  test('shows added course text when course already selected', () => {
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

  test('renders course image', () => {
    const store = makeStore();

    renderAboutCourse(store);

    const image = screen.getByAltText('Йога');

    expect(image).toBeInTheDocument();
  });
});
