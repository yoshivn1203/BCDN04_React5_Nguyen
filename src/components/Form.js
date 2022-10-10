import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, viewStudentDetail, updateStudent } from '../features/studentSlice';

const initialState = { id: '', name: '', phoneNumber: '', email: '' };
const Form = () => {
  const [formValue, setFormValue] = useState({
    info: initialState,
    msg: initialState,
    isValid: initialState,
  });
  const [formIsValid, SetFormIsvalid] = useState(false); //validity of the whole form
  const [isEditing, setIsEditing] = useState(false);
  const { studentList, SelectedStudent } = useSelector((store) => store.student);
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
    if (name === 'id') {
      const studentsWithSameID = studentList.filter((s) => s.id === value);
      if (studentsWithSameID.length !== 0) {
        message = `${title} "${value}" is already exist`;
      }
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
    if (isEditing) {
      dispatch(updateStudent(formValue.info));
    } else {
      dispatch(addStudent(formValue.info));
    }
    setFormValue({ info: initialState, msg: initialState, isValid: initialState }); // clear form
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormValue({ info: initialState, msg: initialState, isValid: initialState });
    dispatch(viewStudentDetail()); // remove SelectedStudent
  };

  // check validity for the whole form
  useEffect(() => {
    const { id, name, phoneNumber, email } = formValue.isValid;
    if (id && name && phoneNumber && email) {
      SetFormIsvalid(true);
    } else {
      SetFormIsvalid(false);
    }
  }, [formValue.isValid]);

  useEffect(() => {
    if (SelectedStudent) {
      setIsEditing(true);
      setFormValue((formValue) => {
        return {
          ...formValue,
          info: SelectedStudent,
          msg: initialState,
          isValid: { id: true, name: true, phoneNumber: true, email: true },
        };
      });
      SetFormIsvalid(true);
    }
  }, [SelectedStudent]);

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
              disabled={isEditing}
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
              pattern='^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$'
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
            {isEditing ? 'Update Student' : 'Add Student'}
          </button>
          {isEditing && (
            <button type='button' className='btn-stopEdit' onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
