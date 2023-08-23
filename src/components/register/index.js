import { useEffect, useState } from "react";
import { userService } from "services/userService";
import { Constant } from "consts/constant";
import { ButtonWrapper, FormWrapper } from "./style";
import { TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Register";
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

    if (input.confirmPassword.length === 0) {
      success = false;
      err.confirmPassword = "Confirm password is required";
    } else {
      if (input.confirmPassword !== input.password) {
        success = false;
        err.confirmPassword = "Confirm password and password must be matched";
      } else {
        err.confirmPassword = "";
      }
    }

    setErrors(err);

    return success;
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);
      const resp = await userService.register(input);
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
      <Typography variant="h5">Register new account</Typography>

      <TextField
        id="email"
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

      <TextField
        id="confirmPassword"
        label="Confirm password"
        type="password"
        value={input.confirmPassword}
        onChange={e => setInput({ ...input, confirmPassword: e.target.value })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />

      <ButtonWrapper>
        <Link to={"/login"}>Already has account</Link>

        <LoadingButton variant="outlined" type="submit" loading={loading}>
          Register
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

export default Register;
