import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";
import "./styles.css";
import axios from "axios";
import { Alert } from "antd";
import { baseUrl } from "../utils/urls";

export default function Login() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      email: mail,
      password: password,
    };

    axios.post(`${baseUrl}/api/auth/authenticate`, { ...user }).then((res) => {
      if (res.data.status === "success") {
        console.log(res);
        dispatch(setUser(res.data.user));
        setErr(true);
        navigate("/home", res.data);
      }
      setErr(false);
    });
  };

  // const isadmin = true;
  return (
    <div className="login">
      {err && <Alert message="User Not Exist" type="error" showIcon />}
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="email"
          className="form_input"
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="password"
          className="form_input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="role">
          <p
            className={isAdmin ? "active" : ""}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </p>
          <p
            className={isAdmin ? "" : "active"}
            onClick={() => setIsAdmin(false)}
          >
            Team Owner
          </p>
        </div>
        <button type="submit" className="login_btn">
          Login
        </button>
      </form>
    </div>
  );
}
