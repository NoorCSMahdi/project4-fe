import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <>
      

      <div className='mainContent'>
        <div className='imageHere'>
          <div className='overlay'>
            <div className="position-relative overflow-hidden p-3 p-md-5 text-center carBackground">
              <div className="col-md-6 p-lg-5 mx-auto my-5 mb-3">
                <h2 className="display-3 fw-bold title mb-2">Crafting Your Dream Spaces, Seamlessly</h2>
                <p className="lead text-black fw-bold mb-5 titlep" style={{marginTop:'22px'}}>Explore our categories and find what you need.</p>
                <div className="d-flex justify-content-center">
                  <Link className="homepage btn btn-dark btn-lg" to="/Category/CategoryList">
                    Explore Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </>
  );
}
