import React from 'react';
import axios from "axios";
import Helpers from "../Config/Helpers";
const GoogleLoginButton = () => {
  const handleLogin = () => {
    axios.get(`${Helpers.googleUrl}login/google`, { withCredentials: true })
    .then(response => {
      window.location.href = response.data.url; // Redirect to the URL returned from the backend
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  };

  return (
    <a className="btn btn-danger btn-block" href={`${Helpers.googleUrl}login/google`}>
      <i className="fab fa-google"></i> Sign in with Google
    </a>
  );
};

export default GoogleLoginButton;