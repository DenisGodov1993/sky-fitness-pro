import axios from 'axios';
import { getCourses } from './coursesApi';

jest.mock('axios');

describe('coursesApi', () => {
  test('выбор курсов', async () => {
    const courses = [{ _id: '1', nameRU: 'Йога' }];

    (axios.get as jest.Mock).mockResolvedValue({
      data: courses,
    });

    const result = await getCourses();

    expect(result).toEqual(courses);
  });
});