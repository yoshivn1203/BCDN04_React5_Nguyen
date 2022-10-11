import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { deleteStudent, viewStudentDetail } from '../features/studentSlice';

const Table = () => {
  const { studentList } = useSelector((store) => store.student);
  const [searchValue, SetSearchValue] = useState('');
  const [filtedStudents, SetFilteredStudents] = useState(studentList);
  const dispatch = useDispatch();

  useEffect(() => {
    const students = studentList.filter((s) =>
      s.name.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    searchValue.trim() === ''
      ? SetFilteredStudents(studentList)
      : SetFilteredStudents(students);
  }, [searchValue, studentList]);

  const renderHeader = () => {
    let headerElement = ['id', 'name', 'phone', 'email', 'operation'];
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return filtedStudents.map(({ id, name, email, phoneNumber }) => {
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{phoneNumber}</td>
          <td>{email}</td>
          <td className='operation'>
            <button
              className='table-button-edit'
              onClick={() => dispatch(viewStudentDetail(id))}
            >
              Edit
            </button>
            <button
              className='table-button-del'
              onClick={() => dispatch(deleteStudent(id))}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='Search'
            className='form-input'
            value={searchValue}
            onChange={(e) => SetSearchValue(e.target.value)}
          />
          <button type='button' className='submit-btn'>
            <FaSearch />
          </button>
        </form>
      </section>
      <table id='employee'>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </>
  );
};

export default Table;
