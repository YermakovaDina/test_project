import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { register, logIn } from '../../redux/auth/auth-operations';

const SignupForm = validate => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = values => {
    console.log({ values });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleReg = e => {
    e.preventDefault();
    dispatch(register(values));
    setFormErrors(validate(values));
    setIsSubmitting(true);
    e.target.reset();
    console.log(e);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  });

  const handleLogin = e => {
    e.preventDefault();
    dispatch(logIn(values));
    setFormErrors(validate(values));
    setIsSubmitting(true);
    console.log(e);
  };

  return {
    handleChange,
    handleReg,
    submit,
    formErrors,
    isSubmitting,
    handleLogin,
  };
};
export default SignupForm;
