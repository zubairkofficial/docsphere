import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../Hooks/useTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import Helpers from "../../Config/Helpers";

const RecoverPassword = () => {
    useTitle("Recover Password");

    const navigate = useNavigate();

    const defaultUser = {
        user_id: "",
        password: "",
        password_confirmation: "",
    }

    const [user, setUser] = useState(defaultUser);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleRecoverPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post(`${Helpers.apiUrl}auth/recover-password`, user, Helpers.authHeaders).then(response => {
            Helpers.toast("success", response.data.message);
            localStorage.clear();
            navigate("/login");
            setIsLoading(false);
        }).catch(error => {
            setErrors(error.response.data.errors || {});
            Helpers.toast("error", error.response.data.message);
            setIsLoading(false);
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
                        <h6 class="overline-title text-primary">Create a new password for your account</h6>
                        </div>
                    </div>
                    <form onSubmit={handleRecoverPassword} class="register-one__form">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="register-one__form__email">
                                <input type="password" value={user.password} onChange={e => setUser({...user, password: e.target.value})} class="form-control form-control-lg" placeholder="Enter Password" />
                                <small className="text-danger">{ errors.password ? errors.password[0] : '' }</small>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="register-one__form__email">
                                <input type="password" value={user.password_confirmation} onChange={e => setUser({...user, password_confirmation: e.target.value})} class="form-control form-control-lg" placeholder="Confirm Password"  />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit" class="thm-btn register-one__btn"  disabled={isLoading} onClick={handleRecoverPassword}>{isLoading ? 'Please wait...' : 'Update Password'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default RecoverPassword;