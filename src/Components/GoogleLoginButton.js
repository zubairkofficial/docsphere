import React from 'react';
import axios from "axios";
import Helpers from "../Config/Helpers";
const GoogleLoginButton = () => {
  const handleLogin = () => {
    axios.get(`${Helpers.apiUrl}auth/login/google`)
      .then(response => {
        window.location.href = response.data.url; // Update backend to return URL
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