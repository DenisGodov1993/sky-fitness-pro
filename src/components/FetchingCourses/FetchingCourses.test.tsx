import { render } from '@testing-library/react';
import FetchingCourses from './FetchingCourses';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';

test('renders FetchingCourses without crash', () => {
  const store = makeStore();

  render(
    <Provider store={store}>
      <FetchingCourses />
    </Provider>,
  );
});