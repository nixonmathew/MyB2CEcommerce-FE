import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from "../../apis/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const redirectBasedOnRole = (res) => {
    let intended = history.location.state;
    console.log(intended);
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "ADMIN") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  useEffect(() => {
    let intended = history.location.state;
    console.log(intended);
    if (intended) return;
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      setLoading(false);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          redirectBasedOnRole(res);
        })
        .catch((err) => {
          console.log("error while saving user ", err);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    const result = await auth.signInWithPopup(googleAuthProvider);
    const { user } = result;
    const idTokenResult = await user.getIdTokenResult();
    try {
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          console.log(
            "response from server for creating or updating user ",
            res
          );
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          redirectBasedOnRole(res);
        })
        .catch((err) => {
          console.log("error while saving user ", err);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          placeholder="Your Email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
      </div>
      <br />
      <div className="form-group">
        <input
          type="password"
          placeholder="Enter your password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || (password && password.length < 6)}
      >
        LOGIN
      </Button>
      <Button
        onClick={googleLogin}
        type="danger"
        className="mb-3"
        block
        shape="round"
        icon={<GoogleOutlined />}
        size="large"
      >
        Login with Google
      </Button>
      <Link to="forgot/password" className="float-right text-danger">
        Forgot Password?
      </Link>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
