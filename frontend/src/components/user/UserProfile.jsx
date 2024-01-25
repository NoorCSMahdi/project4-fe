import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default function UserProfile(props) {
  console.log('props', props);
  return (
    <>
    <h1 style={{ textAlign: 'center' }}>User Profile</h1>
    <div className="container">
      <div className="card">
        <div className="card-body">
       
          <div className="row">
            <div className="col">
              <p className="card-text"><strong>User Full Name:</strong> {props.user_fullName}</p>
              <p className="card-text"><strong>User Phone Number:</strong> {props.user_phoneNumber}</p>
              <p className="card-text"><strong>User Type:</strong> {props.userType}</p>
              <p className="card-text"><strong>User Email Address:</strong> {props.user_emailAddress}</p>
              <p className="card-text"><strong>User Type:</strong> {props.userType}</p>
            </div>
            <div className="col">
              <img
                src={props.user_image}
                className="card-img-top"
                style={{ width: "50%", height: "auto", objectFit: "contain" }}
                alt={props.user_fullName}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Link to="/user/EditProfile/" className="btn btn-dark">
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}