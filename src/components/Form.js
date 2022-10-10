import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent } from '../features/studentSlice';

const initialState = { id: '', name: '', phoneNumber: '', email: '' };
const Form = () => {
  const [formValue, setFormValue] = useState({
    info: initialState,
    msg: initialState,
    isValid: initialState,
  });
  const [formIsValid, SetFormIsvalid] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const {
      name,
      title,
      value,
      minLength,
      maxLength,
      validity: { valueMissing, patternMismatch, valid },
    } = e.target;
    let message = '';

    //validation
    if (valueMissing) {
      message = `This field is required and cannot be empty`;
    }
    if (
      minLength > -1 &&
      maxLength > -1 &&
      (value.length < minLength || value.length > maxLength)
    ) {
      message = `${title} should have ${minLength} - ${maxLength} digits`;
    }
    if (patternMismatch) {
      message = `invalid ${title} format`;
    }
    setFormValue({
      info: { ...formValue.info, [e.target.name]: e.target.value },
      msg: { ...formValue.msg, [name]: message },
      isValid: { ...formValue.isValid, [name]: valid },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(formValue.info));
    setFormValue({ info: initialState, msg: initialState, isValid: initialState }); // clear form
  };

  // check validity for the whole form
  useEffect(() => {
    const { id, name, phoneNumber, email } = formValue.isValid;
    if (id === true && name === true && phoneNumber === true && email === true) {
      SetFormIsvalid(true);
    } else {
      SetFormIsvalid(false);
    }
  }, [formValue.isValid]);

  return (
    <>
      <h2>Student Management</h2>
      <hr />
      <form onSubmit={handleSubmit} noValidate>
        <div className='control-group'>
          <div className={`form-control ${formValue.msg.id ? 'invalid' : ''}`}>
            <label htmlFor='id'>ID</label>
            <input
              required
              type='text'
              id='id'
              name='id'
              title='ID'
              value={formValue.info.id}
              pattern='^[a-zA-Z0-9]*$'
              onChange={handleChange}
            />
            <p className='error-text'>{formValue.msg.id}</p>
          </div>
          <div className={`form-control ${formValue.msg.name ? 'invalid' : ''}`}>
            <label htmlFor='name'>Name</label>
            <input
              required
              type='text'
              id='name'
              name='name'
              title='name'
              pattern='^[a-zA-Z ]*$'
              value={formValue.info.name}
              onChange={handleChange}
            />
            <p className='error-text'>{formValue.msg.name}</p>
          </div>
          <div className={`form-control ${formValue.msg.phoneNumber ? 'invalid' : ''}`}>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              required
              type='text'
              id='phoneNumber'
              name='phoneNumber'
              title='Phone Number'
              pattern='^[0-9]*$'
              minLength={10}
              maxLength={12}
              value={formValue.info.phoneNumber}
              onChange={handleChange}
            />
            <p className='error-text'>{formValue.msg.phoneNumber}</p>
          </div>
          <div className={`form-control ${formValue.msg.email ? 'invalid' : ''}`}>
            <label htmlFor='email'>E-Mail Address</label>
            <input
              required
              type='text'
              id='email'
              name='email'
              title='email'
              pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$'
              value={formValue.info.email}
              onChange={handleChange}
            />
            <p className='error-text'>{formValue.msg.email}</p>
          </div>
        </div>
        <div className='form-actions'>
          <button type='submit' disabled={!formIsValid}>
            Add Student
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
