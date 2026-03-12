import axios from 'axios';
import { getMe } from './userApi';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getMe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('вызывает API с токеном из localStorage.', async () => {
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

  test('При отсутствии токена, API следует вызывать без заголовка Authorization', async () => {
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