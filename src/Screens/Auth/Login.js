import { Link } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import { useState } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";
import GoogleLoginButton from "../../Components/GoogleLoginButton";

const Login = () => {
  useTitle("Login");
  const [showPassword, setShowPassword] = useState(false);

  const defaultUser = {
    email: "testemail@test.com",
    password: "12345678",
  };

  const [user, setUser] = useState(defaultUser);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${Helpers.apiUrl}auth/login`, user)
      .then((response) => {
        Helpers.toast("success", response.data.message);
        Helpers.setItem("user", response.data.user, true);
        Helpers.setItem("token", response.data.token);
        const loginTimestamp = new Date().getTime();
        Helpers.setItem("loginTimestamp", loginTimestamp);
        if (response.data.user.user_type == 1) {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/user/dashboard";
        }
        setIsLoading(false);
      })
      .catch((error) => {
        Helpers.toast("error", error.response.data.message);
        setErrors(error.response.data.errors || {});
        setIsLoading(false);
      });
  };






  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };












  return (
    <section class="login-page full-height">
      <div
        class="login-page__shape-1"
        style={{
          backgroundImage: "url(assets/images/shapes/login-page-shape-1.png)",
        }}
      ></div>
      <div class="login-page__shape-2"></div>
      <div class="container">
        <div class="login-page__inner glass">
          <div class="login-page__top">
            <div class="login-page__logo">
              <a href="index.html">
                <img src="app/logo-sq-duo.png" className="w100" alt="" />
              </a>
            </div>
          </div>
          <form onSubmit={handleLogin} class="register-one__form">
            <div class="row">
              <div class="col-md-12">
                <div class="register-one_form_email">
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    class="form-control form-control-lg"
                    placeholder="Enter Email Address"
                  />
                  <small className="text-danger">
                    {errors.email ? errors.email[0] : ""}
                  </small>
                </div>
              </div>
              <div className="col-md-12">
      <div className="register-one_form_password position-relative">
        <input
          type={showPassword ? "text" : "password"}
          value={user.password}
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
          className="form-control form-control-lg"
          placeholder="Enter Password"
          required
        />
        <span
          onClick={togglePasswordVisibility}
          className="position-absolute"
          style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
        >
          <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
        </span>
        <small className="text-danger">
          {errors.password ? errors.password[0] : ""}
        </small>
      </div>
    </div>
              <div class="col-md-12">
                <Link to={"/forgot-password"} className="c-primary">
                  Forgot Password?
                </Link>
              </div>
              <div class="col-md-12">
                <button
                  type="submit"
                  class="thm-btn register-one__btn"
                  disabled={isLoading}
                  onClick={handleLogin}
                >
                  {isLoading ? "Please wait..." : "Login"}
                </button>
              </div>
            </div>
          </form>
          <div class="col-md-12">
            <GoogleLoginButton />
          </div>
          <p class="register-one__tagline">
            Don’t have an account?{" "}
            <Link to="/register" className="c-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
