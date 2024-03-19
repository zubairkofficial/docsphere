import axios from "axios";
import Helpers from "../../Config/Helpers";
import { useEffect, useState } from "react";
import PageLoader from "../../Components/Loader/PageLoader";
import useTitle from "../../Hooks/useTitle";
import TextInput from "../../Components/Input";

const UserProfile = () => {

    useTitle("Account Profile");

    const defaultPass = {
        password: "",
        password_confirmation: "",
    }

    const [user, setUser] = useState({});
    const [pageLoading, setPageLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const [isLoading, setIsLoading] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [password, setPassword] = useState(defaultPass);
    const [errors, setErrors] = useState({});
    const getProfileInfo = () => {
        setPageLoading(true);
        axios.get(`${Helpers.apiUrl}user/info`, Helpers.authHeaders).then(response => {
            Helpers.setItem('user', response.data.user, true);
            setUser(response.data.user);
            setPageLoading(false);
        });
    }

    const updateProfilePic = e => {
        setIsLoading(true);
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('profile_pic', file);
        axios.post(`${Helpers.apiUrl}user/update-picture`, formData, Helpers.authFileHeaders).then(response => {
            setIsLoading(false);
            window.location.reload();
        }).catch(error => {
            Helpers.toast("error", error.response.data.message);
            setIsLoading(false);
        })
    }

    const updatePasswod = () => {
        setIsLoading(true);
        axios.post(`${Helpers.apiUrl}user/update-password`, password, Helpers.authHeaders).then(response => {
            Helpers.toast("success", response.data.message);
            setUpdatePassword(false);
            setPassword(defaultPass);
            setIsLoading(false);
        }).catch(error => {
            Helpers.toast("error", error.response.data.message);
            setErrors(error.response.data.errors || {});
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getProfileInfo();
    }, []);

    return (
        <div className="nk-content">
            <div className="container-xl">
                <div className="nk-content-inner">
                    {pageLoading ? <PageLoader /> : <div className="nk-content-body">
                        <div className="nk-block-head nk-page-head">
                            <div className="nk-block-head-between">
                                <div className="nk-block-head-content"><h2 className="display-6">Personal Account</h2></div>
                            </div>
                        </div>
                        {!updatePassword && <div className="nk-block">
                            
                            <div className="tab-content">
                                <div className='' id="profile-tab-pane">
                                    <table className="table table-flush table-middle mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="tb-col"><span className="fs-15px text-light">Profile Picture</span></td>
                                                <td className="tb-col">
                                                    <span className="fs-15px text-base"><img className="profile-pic" src={Helpers.serverImage(user.profile_pic)} alt="" /></span>
                                                    <label for="profile_picture_select"><span className="btn btn-primary btn-sm ml10">Update Profile Picture</span></label>
                                                    <input id="profile_picture_select" onChange={updateProfilePic} className="d-none " type="file" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="tb-col"><span className="fs-15px text-light">Full Name</span></td>
                                                <td className="tb-col"><span className="fs-15px text-base">{ user.name }</span></td>
                                                
                                            </tr>
                                            <tr>
                                                <td className="tb-col"><span className="fs-15px text-light">Email</span></td>
                                                <td className="tb-col"><span className="fs-15px text-base">{ user.email }</span></td>
                                                <td className="tb-col tb-col-end tb-col-sm"></td>
                                            </tr>
                                            <tr>
                                                <td className="tb-col"><span className="fs-15px text-light">Password</span></td>
                                                <td className="tb-col">
                                                    <span className="fs-15px text-base"><a className="link link-primary fw-normal" href="#!" onClick={() => setUpdatePassword(true)}>Change Password</a></span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                            </div>
                        </div>}
                        {updatePassword && <div className="nk-block">
                            <div className="card shadown-none">
                                <div className="card-body">
                                    <h3>Update Your Password</h3>
                                    <div className="row g-3 gx-gs">
                                        <form onSubmit={updatePasswod}>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-label">New Password</label>
                                                    <div className="form-control-wrap">
                                                        <input type="password" value={password.password} onChange={e => setPassword({...password, password: e.target.value})} className="form-control" placeholder="Enter New Password" />
                                                        <small className="text-danger">{ errors.password ? errors.password[0] : '' }</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                                <div className="form-group">
                                                    <label className="form-label">Confirm Password</label>
                                                    <div className="form-control-wrap">
                                                        <input type="password" value={password.password_confirmation} onChange={e => setPassword({...password, password_confirmation: e.target.value})} className="form-control" placeholder="Confirm Your Password" />
                                                        <small className="text-danger">{ errors.password_confirmation ? errors.password_confirmation[0] : '' }</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="col-md-12">
                                            <button className="btn btn-primary" onClick={updatePasswod} disabled={isLoading}>{isLoading ? 'Saving...' : 'Save New Password'}</button>
                                            <button className="btn btn-outline-danger ml10" onClick={() => setUpdatePassword(false)} disabled={isLoading}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;