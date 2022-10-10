import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  studentList: [
    { id: 'k1', name: 'Ben', phoneNumber: '0896565447', email: 'ben@mail.com' },
    { id: 'k2', name: 'Alex', phoneNumber: '0965412358', email: 'alex@mail.com' },
  ],
  SelectedStudent: {},
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, { payload }) => {
      console.log(payload);
      state.studentList.push(payload);
      toast.success('Add Student Successfully');
    },
    deleteStudent: (state, { payload }) => {
      const tempList = state.studentList.filter((student) => student.id !== payload);
      state.studentList = tempList;
      toast.success('Delete Student Successfully');
    },
    findStudentById: (state, { payload }) => {
      const student = state.studentList.find((student) => student.id === payload);
      state.SelectedStudent = student;
    },
  },
});
export const { addStudent, deleteStudent } = studentSlice.actions;
export default studentSlice.reducer;
