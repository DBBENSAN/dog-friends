import React, { useState } from 'react';
import Swal from 'sweetalert'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';


function LoginModal() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  // console.log("login", login)
  const handleFormSubmit  = async (e) => {
    e.preventDefault();

    try {
      const mutationResponse = await login({
        variables: { username: username, password: password },
      });

      const token = mutationResponse.data.login.token;
      const userID = mutationResponse.data.login.user._id;
      // console.log("token",token)
      // console.log("userID",userID)
      Auth.login(token);
      navigate(`/dashboard/${userID}`);
    } catch (err) {
      console.error(err);
      Swal('Oops!', 'Something went wrong!', 'error');

    }
  };



  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">User Name:</label>
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">
          Login
        </button>
      </form>
    </div>

  )
}
export default LoginModal


// not checking password issue in the resolvers