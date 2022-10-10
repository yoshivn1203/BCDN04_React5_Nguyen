import { useDispatch, useSelector } from 'react-redux';

const Table = () => {
  const { studentList } = useSelector((store) => store.student);
  const dispatch = useDispatch();

  const renderHeader = () => {
    let headerElement = ['id', 'name', 'phone', 'email', 'operation'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return studentList.map(({ id, name, email, phoneNumber }) => {
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{phoneNumber}</td>
          <td>{email}</td>
          <td className='operation'>
            <button className='table-button' onClick={() => console.log(id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h2 id='title'>Student List</h2>
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
