import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  studentList: [
    { id: 1, name: 'Ben', phoneNumber: '0896565447', email: 'ben@mail.com' },
    { id: 2, name: 'Alex', phoneNumber: '0965412358', email: 'alex@mail.com' },
  ],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, { payload }) => {
      state.studentList.push(payload);
      toast.success('Add Student Successfully');
    },
  },
});
export const { addStudent } = studentSlice.actions;
export default studentSlice.reducer;
