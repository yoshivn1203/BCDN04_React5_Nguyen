import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  studentList: [
    { id: 'k1', name: 'Ben', phoneNumber: '0896565447', email: 'ben@mail.com' },
    { id: 'k2', name: 'Alex', phoneNumber: '0965412358', email: 'alex@mail.com' },
  ],
  SelectedStudent: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, { payload }) => {
      state.studentList.push(payload);
      toast.success('Add Student Successfully');
    },
    deleteStudent: (state, { payload }) => {
      const tempList = state.studentList.filter((student) => student.id !== payload);
      state.studentList = tempList;
      toast.success('Delete Student Successfully');
    },
    viewStudentDetail: (state, { payload }) => {
      if (payload) {
        const student = state.studentList.find((student) => student.id === payload);
        state.SelectedStudent = student;
      } else {
        state.SelectedStudent = null;
      }
    },
    updateStudent: (state, { payload }) => {
      let { studentList } = state;
      let index = studentList.findIndex((s) => s.id === payload.id);
      if (index !== -1) {
        studentList[index] = payload;
        toast.success('Update Student Successfully');
      } else {
        toast.error('Error! Something went wrong');
      }
      state.SelectedStudent = null;
    },
  },
});
export const { addStudent, deleteStudent, viewStudentDetail, updateStudent } =
  studentSlice.actions;
export default studentSlice.reducer;
