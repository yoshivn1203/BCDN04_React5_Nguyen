import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from './components/Form';
import Table from './components/Table';

function App() {
  return (
    <>
      <div className='app'>
        <Form />

        <Table />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
