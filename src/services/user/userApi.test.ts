import axios from 'axios';
import { getMe } from './userApi';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getMe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call API with token from localStorage', async () => {
    Storage.prototype.getItem = jest.fn(() => 'test-token');

    mockedAxios.get.mockResolvedValue({
      data: { username: 'test@test.com' },
    });

    const data = await getMe();

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/users/me'),
      {
        headers: {
          Authorization: 'Bearer test-token',
        },
      },
    );

    expect(data).toEqual({
      username: 'test@test.com',
    });
  });

  test('should call API without Authorization header if no token', async () => {
    Storage.prototype.getItem = jest.fn(() => null);

    mockedAxios.get.mockResolvedValue({
      data: { username: 'test@test.com' },
    });

    await getMe();

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/users/me'),
      {
        headers: {},
      },
    );
  });
});
