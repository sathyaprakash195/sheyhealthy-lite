import { Button, Form, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { ShowLoader } from "../../redux/loaderSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinsh = async (values) => {
    try {
      dispatch(ShowLoader(true))
      const response = await LoginUser(values);
      dispatch(ShowLoader(false))
      if (response.success) {
        message.success(response.message);
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data,
            password: "",
          })
        );
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) navigate("/");
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <Form layout="vertical" className="w-400 bg-white p-2" onFinish={onFinsh}>
        <h2 className="uppercase my-1">
          <strong>SHEYHELTHY Login</strong>
        </h2>
        <hr />

        <Form.Item label="Email" name="email">
          <input type="email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <input type="password" />
        </Form.Item>

        <button className="contained-btn my-1 w-full" type="submit">
          Login
        </button>

        <Link className="underline" to="/register">
          Dont have an account? <strong>Sign Up</strong>
        </Link>
      </Form>
    </div>
  );
}

export default Login;
