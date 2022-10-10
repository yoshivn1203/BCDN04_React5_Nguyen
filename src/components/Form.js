import React, { useState } from 'react';

const initialState = { id: '', name: '', phoneNumber: '', email: '' };
const Form = () => {
  const [formValue, setFormValue] = useState({
    info: initialState,
    errors: initialState,
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      info: { ...formValue.info, [e.target.name]: [e.target.value] },
    });
  };
  const handleBlur = (e) => {
    console.log(e.target.validity);
    const {
      name,
      value,
      validity: { valueMissing },
    } = e.target;
    let message = '';

    if (valueMissing) {
      message = `This field is required and cannot be empty`;
    }
    setFormValue({ ...formValue, errors: { ...formValue.errors, [name]: message } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  // const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  // const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={handleSubmit} className='form-layout'>
      <div className='control-group'>
        <div className={`form-control ${formValue.errors.id ? 'invalid' : ''}`}>
          <label htmlFor='id'>ID</label>
          <input
            required
            type='text'
            id='id'
            name='id'
            value={formValue.info.id}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className='error-text'>{formValue.errors.id}</p>
        </div>
        <div className={`form-control ${formValue.errors.name ? 'invalid' : ''}`}>
          <label htmlFor='name'>Name</label>
          <input
            required
            type='text'
            id='name'
            name='name'
            value={formValue.info.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className='error-text'>{formValue.errors.name}</p>
        </div>
        <div className={`form-control ${formValue.errors.phoneNumber ? 'invalid' : ''}`}>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <input
            required
            type='text'
            id='phoneNumber'
            name='phoneNumber'
            value={formValue.info.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className='error-text'>{formValue.errors.phoneNumber}</p>
        </div>
        <div className={`form-control ${formValue.errors.email ? 'invalid' : ''}`}>
          <label htmlFor='email'>E-Mail Address</label>
          <input
            required
            type='text'
            id='email'
            name='email'
            value={formValue.info.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className='error-text'>{formValue.errors.email}</p>
        </div>
      </div>
      <div className='form-actions'>
        <button type='submit'>Submit</button>
      </div>
    </form>
  );
};

export default Form;
