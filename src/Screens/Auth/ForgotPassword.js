import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import { useState } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";

const ForgotPassword = () => {
    useTitle("Forgot Password");

    const defaultUser = {
        email: "",
    }

    const navigate = useNavigate();

    const [user, setUser] = useState(defaultUser);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${Helpers.apiUrl}auth/forgot-password`, user).then(response => {
            Helpers.toast("success", response.data.message);
            Helpers.setItem("user_id", response.data.user_id);
            navigate('/verify-email-password');
            setIsLoading(false);
        }).catch(error => {
            Helpers.toast("error", error.response.data.message);
            setErrors(error.response.data.errors || {});
            setIsLoading(false);
        })
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
                    <form onSubmit={handleForgotPassword} class="register-one__form">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="register-one__form__email">
                                <input type="email" value={user.email} onChange={e => setUser({...user, email:e.target.value})} class="form-control form-control-lg" placeholder="Enter Email Address" />
                                <small className="text-danger">{ errors.email ? errors.email[0] : '' }</small>
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <button type="submit" class="thm-btn register-one__btn"  disabled={isLoading} onClick={handleForgotPassword}>{isLoading ? 'Please wait...' : 'Verify Email Address'}</button>
                                    
                            </div>
                        </div>
                    </form>
                    <p class="register-one__tagline">Back to account login? <Link to="/login" className="c-primary">Sign In</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default ForgotPassword;