import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";

const VerifyForgotPassword = () => {
    useTitle("Verify Email");

    const navigate = useNavigate();

    const defaultUser = {
        code: "",
        user_id: "",
    }

    const [user, setUser] = useState(defaultUser);
    const [isLoading, setIsLoading] = useState(false);
    const [sendingEmail, setSendingEmail] = useState(false);
    const [errors, setErrors] = useState({});

    const handleVerification = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${Helpers.apiUrl}auth/verify-forgot-password-email`, user).then(response => {
            Helpers.toast("success", response.data.message);
            setIsLoading(false);
            navigate('/recover-password');
        }).catch(error => {
            setErrors(error.response.data.errors || {});
            Helpers.toast("error", error.response.data.message);
            setIsLoading(false);
        });
    }

    const resendEmail = (e) => {
        e.preventDefault();
        setSendingEmail(true);
        axios.post(`${Helpers.apiUrl}auth/resend-email`, {user_id: user.user_id}).then(response => {
            Helpers.toast("success", response.data.message);
            setSendingEmail(false);
        }).catch(error => {
            Helpers.toast("error", error.response.data.message);
            setSendingEmail(false);
        });
    }

    useEffect(() => {
        const checkUserId = localStorage.getItem("user_id");
        if(checkUserId){
            setUser({...user, user_id: checkUserId});
        }else{
            navigate("/register");
        }
    }, []);

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
                    <div class="row justify-content-center text-center">
                        <div class="col-lg-11 col-xl-10 col-xxl-9">
                        <h6 class="overline-title text-primary">Enter the code you received on your email address to continue</h6>
                        </div>
                    </div>
                    <form onSubmit={handleVerification} class="register-one__form">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="register-one__form__email">
                                <input type="text" class="form-control form-control-lg" value={user.code} maxLength={6} onChange={e => setUser({...user, code: e.target.value})} placeholder="Enter Verification Code" />
                                <small className="text-danger">{ errors.code ? errors.code[0] : '' }</small>
                                </div>
                            </div>
                            
                            <div class="col-md-12">
                                <button type="submit" class="thm-btn register-one__btn" disabled={isLoading} onClick={handleVerification}>{isLoading ? 'Verifying...' : 'Continue'}</button>
                            </div>
                        </div>
                    </form>
                    <p class="register-one__tagline">Didn't received code? <Link  className="c-primary" onClick={resendEmail}>{sendingEmail ? 'Resending....' : 'Resend'}</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default VerifyForgotPassword;