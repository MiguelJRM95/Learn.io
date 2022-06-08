import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { signUpWithEmail } from './api';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const alert = useAlert();

  const onSubmit = async () => {
    const { error, user } = await signUpWithEmail({ email, password }, { firstName, lastName });
    if (error) return alert.error('Something went wrong');
    if (user) {
      return alert.success('Congrats Sign up request success with email: ' + ' ' + email);
    }
  };

  return (
    <div>
      <p>Hello welcome to Learnio your e-learning Platform</p>
      <h3>Request your student user account!</h3>
      <div>
        <p>E-mail</p>
        <input
          type="text"
          name="email"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        />
        <p>First name</p>
        <input
          type="text"
          name="first_name"
          value={firstName}
          onInput={(e) => setFirstName((e.target as HTMLInputElement).value)}
        />
        <p>Last name</p>
        <input
          type="text"
          name="last_name"
          value={lastName}
          onInput={(e) => setLastName((e.target as HTMLInputElement).value)}
        />
        <p>Password</p>
        <input
          type="text"
          name="password"
          value={password}
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
        />
        <button type="submit" onClick={() => onSubmit()}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
