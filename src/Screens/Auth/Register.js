import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import { useState } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";



const Register = () => {
    useTitle("Register");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const defaultUser = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    }

    const [user, setUser] = useState(defaultUser);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
      };
    
    const handleRegistration = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${Helpers.apiUrl}auth/register`, user, Helpers.authHeaders).then(response => {
            Helpers.toast("success", response.data.message);
            localStorage.setItem("user_id", response.data.user_id);
            navigate("/verify-email");
            setIsLoading(false);
        }).catch(error => {
            setErrors(error.response.data.errors || {});
            Helpers.toast("error", error.response.data.message);
            setIsLoading(false);
        });
    }
    return (
        <section class="login-page full-height">
            <div class="login-page__shape-1" style={{backgroundImage: "url(assets/images/shapes/login-page-shape-1.png)"}}></div>
            <div class="login-page__shape-2"></div>
            <div class="container">
                <div class="login-page__inner glass">
                    <div class="login-page__top">
                        <div class="login-page__logo">
                            <a href="index.html"><img src="app/logo-sq-duo.png" className="w100" alt="" /></a>
                        </div>
                    </div>
                    <form onSubmit={handleRegistration} class="register-one__form" autoComplete="off">
                        <div class="row">
                            <div class="col-md-12">
                            <label class="form-label" for="emailorusername">Name</label>
                                <div class="register-one__form__email">
                                    
                                    <input type="text" class="form-control form-control-lg"  value={user.name} onChange={e => setUser({...user, name: e.target.value})} placeholder="Enter Full Name" />
                                    <small className="text-danger">{ errors.name ? errors.name[0] : '' }</small>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="register-one__form__email">
                                    <input type="email" class="form-control form-control-lg"  value={user.email} onChange={e => setUser({...user, email: e.target.value})} placeholder="Enter Email" />
                                    <small className="text-danger">{ errors.email ? errors.email[0] : '' }</small>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="register-one_form_password position-relative">
                                <input   type={showPassword ? "text" : "password"} value={user.password} onChange={e => setUser({...user, password: e.target.value})} class="form-control form-control-lg" placeholder="Enter Password" />
                                     <span
                                        onClick={togglePasswordVisibility}
                                        className="position-absolute"
                                        style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                        >
                                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                                    </span>
                                     


                                <small className="text-danger">{ errors.password ? errors.password[0] : '' }</small>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="register-one_form_password position-relative">
                                    <input  type={showPassword ? "text" : "password"}  value={user.password_confirmation} onChange={e => setUser({...user, password_confirmation: e.target.value})} class="form-control form-control-lg" placeholder="Confirm Password"  />

                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="position-absolute"
                                        style={{ top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                        >
                                    </span>


                                </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit"  disabled={isLoading} onClick={handleRegistration} class="thm-btn register-one__btn">
                                {isLoading ? 'Creating account...' : 'Create My Free Account'}
                                </button>
                            </div>
                        </div>
                    </form>
                    <p class="register-one__tagline">Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Register;