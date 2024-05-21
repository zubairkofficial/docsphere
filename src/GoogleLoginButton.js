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
    <button className="btn btn-danger btn-block" onClick={handleLogin}>
      <i className="fab fa-google"></i> Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;