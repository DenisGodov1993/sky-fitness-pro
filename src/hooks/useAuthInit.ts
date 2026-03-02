'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { setUser, clearUser } from '@/store/features/authSlice';

export const useAuthInit = () => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (username && token) {
      dispatch(setUser({ username, token }));
    } else {
      dispatch(clearUser());
    }

    setTimeout(() => setIsChecked(true), 0);
  }, [dispatch]);

  return isChecked;
};
