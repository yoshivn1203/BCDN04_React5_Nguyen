import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './components/features/studentSlice';
export const store = configureStore({
  reducer: {
    student: studentSlice,
  },
});
