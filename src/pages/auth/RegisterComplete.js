import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase'
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../apis/auth';

const RegisterComplete = ({ history }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const email = localStorage.getItem('emailForSignIn');
    if (email) {
      setEmail(email);
    }
  }, [history])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href);
      if (result.user.emailVerified) {
        localStorage.removeItem('emailForSignIn');
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token).then(res => {
          console.log('response from server for creating or updating user ', res)
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id
            }
          })
        }).catch(err => {
          console.log('error while saving user ', err);
        })
        history.push('/')
      }

    } catch (error) {

    }
  }

  const registerForm = () => <form onSubmit={handleSubmit}>
    <input type="email" className="form-control" value={email} disabled />
    <br />
    <input type="password" className="form-control" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} />
    <br />
    <button type="submit" className="btn btn-raised">Complete Registration</button>
  </form>

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register complete</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete;
