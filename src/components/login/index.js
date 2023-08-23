import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { toast } from "react-toastify";
import { Constant } from "../../consts/constant";
import { Link } from "react-router-dom";
import { ButtonWrapper, FormWrapper } from "./style";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const validate = () => {
    let success = true;
    const err = { ...errors };
    if (input.username.length === 0) {
      success = false;
      err.username = "Username/Email is required";
    } else {
      if (
        input.username.includes("@") &&
        !Constant.pattern.email.test(input.username)
      ) {
        err.username = "Invalid email";
        success = false;
      } else {
        err.username = "";
      }
    }

    if (input.password.length === 0) {
      success = false;
      err.password = "Password is required";
    } else {
      err.password = "";
    }
    setErrors(err);

    return success;
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      const resp = await userService.login(input);
      if (resp.success) {
        const { user, token } = resp.data;
        localStorage.setItem(Constant.storageKey.token, token);
        localStorage.setItem(Constant.storageKey.user, JSON.stringify(user));

        window.location.replace("/");
      } else {
        toast.error(resp.error.message);
      }
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <Typography variant="h5" textAlign="center">
        Welcome to movie hub
      </Typography>
      <TextField
        id="username"
        label="Username/Email"
        value={input.username}
        onChange={e => setInput({ ...input, username: e.target.value })}
        error={!!errors.username}
        helperText={errors.username}
      />

      <TextField
        id="password"
        label="Password"
        type="password"
        value={input.password}
        onChange={e => setInput({ ...input, password: e.target.value })}
        error={!!errors.password}
        helperText={errors.password}
      />

      <ButtonWrapper>
        <Link to={"/register"}>Register</Link>

        <LoadingButton variant="outlined" type="submit" loading={loading}>
          Login
        </LoadingButton>
      </ButtonWrapper>

      <ButtonWrapper>
        <a href="#">Sign in by Google</a>
        <span>or</span>
        <a href="#">Sign in by Facebook</a>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default Login;
