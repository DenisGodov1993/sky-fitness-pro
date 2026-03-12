import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ProfileUser from "./ProfileUser";
import { makeStore } from "@/store/store";

test("renders profile title", () => {
  const store = makeStore();

  render(
    <Provider store={store}>
      <ProfileUser username="test@test.com"/>
    </Provider>
  );

  expect(screen.getByText("Профиль")).toBeInTheDocument();
});

test("renders user email", () => {
  const store = makeStore();

  render(
    <Provider store={store}>
      <ProfileUser username="test@test.com"/>
    </Provider>
  );

  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});
