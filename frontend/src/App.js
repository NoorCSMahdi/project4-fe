import React, { useEffect, useState } from "react";
import ConsultationList from "./components/consultation/consultationList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import CategoryList from "./components/Category/CategoryList";
import AddCompanyForm from "./components/company/AddCompanyForm";
import Companies from "./components/company/Companies";
import JoinRequestForm from "./components/company/JoinRequestForm";
import SignInForm from "./components/user/SignInForm";
import SignUpForm from "./components/user/SignUpForm";
// import EditProfile from './components/user/EditProfile';
import Request from "./components/adminView/Request";
import AppointmentList from "./components/appointment/AppointmentList";
import CompanyDetails from "./components/company/CompanyDetails";
import HomePage from "./components/homePage/HomePage";
import QuotationList from "./components/quotation/QuotationList";
import EditProfile from "./components/user/EditProfile";
import UserList from "./components/user/UserList";
import UserProfile from "./components/user/UserProfile";
import RequestList from "./components/adminView/RequestList";
import ConsultationCreateForm from "./components/consultation/consultationCreateForm";
import QuotationCreateForm from "./components/quotation/QuotationCreateForm";
import ConsultationDetails from "./components/consultation/ConsultationDetails";

function App() {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = getUser();
    console.log("INIT USER", user);
    if (user) {
      console.log("user if", user);
      setIsAuth(true);
      setUserId(user.id);
      showUser(user.id);
    } else {
      sessionStorage.removeItem("token");
      setIsAuth(false);
      setUserId(null);
    }
  }, []);

  const registerHandler = (user) => {
    Axios.post("auth/signup", user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginHandler = (cred) => {
    Axios.post("/auth/signin", cred)
      .then((res) => {
        console.log("res.data.token", res.data.token)
        let token = res.data.token;
        if (token != null) {
          sessionStorage.setItem("token", token);
          const user = getUser();
          console.log(user);
          sessionStorage.setItem("UserId", user.id);
          user ? setIsAuth(true) : setIsAuth(false);
          user ? setUserId(user.id) : setUserId(null);
          user ? showUser(user.id) : showUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token).user : null;
  };
  const getToken = () => {
    const token = sessionStorage.getItem("token");
    return token;
  };
  const onLogoutHandler = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    setIsAuth(false);
    setUserId(null);
    setCurrentUser(null);
  };
  const showUser = (id) => {
    Axios.get(`/user/detail?id=${id}`)
      .then((response) => {
        let user = response.data.user;
        sessionStorage.setItem("userType",user.userType)
        console.log('current user', user);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setHeaders = () => {
    return { headers: { Authorization: `Bearer ${getToken()}` } };
  };
  const editUpdate = async (user) => {
    try {
      await Axios.put("/user/update", user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showUser(userId);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
    <div class="App">
    <header className="bg-dark text-white text-center py-2">
        <div className="container">
          <nav className="navbar navbar-expand-lg px-0">
          {isAuth && currentUser?.userType === "User"? (
        <div>
          <Link to="/" className="btn">
            Home
          </Link>
          &nbsp;
          
          {/* <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/company/AddCompanyForm"
          >
            Add Company
          </Link>{" "}
          &nbsp; */}
         
            <Link  className="nav-link text-white d-inline"
            style={{ padding: 10 }} to="/logout" onClick={onLogoutHandler} >
            Logout
          </Link>{" "}
          &nbsp;
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/company/JoinRequestForm"
          >
            Join As a Company
          </Link>{" "}
          &nbsp;
          {/* <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/company/Companies"
          >
            Show Companies
          </Link>{" "}
          &nbsp; */}
          {/* <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/user/UserList"
          >
            {" "}
            User List{" "}
          </Link>{" "}
          &nbsp; */}
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/user/UserProfile"
          >
            {" "}
            User Profile{" "}
          </Link>{" "}
          &nbsp;
          {/* <Link className="nav-link text-white d-inline" style={{padding:10}} to="/company/CompanyDetails"> Company Details </Link> &nbsp; */}
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/Category/CategoryList"
          >
            Category List
          </Link>{" "}
          &nbsp;
          {/* <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/consultation/consultationList"
          >
            Consultation List
          </Link>{" "} */}
          &nbsp;
           <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/quotation/QuotationList"
          >
            {" "}
            QuotationList{" "}
          </Link>{" "}
          &nbsp;
          {/*<Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/appointment/AppointmentList"
          >
            {" "}
            Appointment List{" "}
          </Link>{" "}
          &nbsp; */}
          {/* 
          
          <Link to="/logout" onClick={onLogoutHandler} className="btn">
            Logout
          </Link> */}

        </div>
      ) :  (
      
        ""
    )}

 {currentUser?.userType === "Admin"? (

          <div>
            <Link to="/" className="btn">
            Home
          </Link>
          &nbsp;
          <Link  className="nav-link text-white d-inline"
            style={{ padding: 10 }} to="/logout" onClick={onLogoutHandler} >
            Logout
          </Link>{" "}
          &nbsp;
            <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/user/UserProfile"
          >
            {" "}
            User Profile{" "}
          </Link>{" "}
          &nbsp;

          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/company/AddCompanyForm"
          >
            {" "}
            Add Company{" "}
          </Link>{" "}
          &nbsp;
            <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/adminView/Request"
          >
            {" "}
            Request List{" "}
          </Link>{" "}
          &nbsp; &nbsp;
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/Category/CategoryList"
          >
            Category List
          </Link>{" "}
          &nbsp;

          {/* <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/consultation/consultationList"
          >
            Consultation List
          </Link>{" "} 
          &nbsp; */}
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/quotation/QuotationList"
          >
            {" "}
            QuotationList{" "}
          </Link>{" "}
          &nbsp;
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/user/UserList"
          >
            {" "}
            User List{" "}
          </Link>{" "}
          &nbsp; 
          </div>
        ): (
      
          ""
      )}
  
   {currentUser?.userType === "CompanyOwner"? (

          <div>
            <Link  className="nav-link text-white d-inline"
            style={{ padding: 10 }} to="/logout" onClick={onLogoutHandler} >
            Logout
          </Link>{" "}
          &nbsp;
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/consultation/consultationList/:company_id"
          >
            Consultation List
          </Link>{" "} 
          &nbsp; 
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/company/AddCompanyForm"
          >
            {" "}
            Add Company{" "}
          </Link>{" "}
          &nbsp;
          <Link
          className="nav-link text-white d-inline"
          style={{ padding: 10 }}
          to="/Category/CategoryList"
        >
          Category List
        </Link>{" "}
        &nbsp;
        
        <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/quotation/QuotationList"
          >
            {" "}
            QuotationList{" "}
          </Link>{" "}
          &nbsp;
          {/* <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/consultation/consultationList/:company_id"
          >
            Consultation List
          </Link>{" "} 
          &nbsp; */}
          </div>
        )
        : (
          ""
             )}

        <>
         
                   
          {/* <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/appointment/AppointmentList"
          >
            {" "}
            Appointment List{" "}
          </Link>{" "}  */}
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/user/SignUpForm"
          >
            {" "}
            Sign Up
          </Link>{" "}
          &nbsp;
          <Link
            className="nav-link text-white d-inline"
            style={{ padding: 10 }}
            to="/user/SignInForm"
          >
            {" "}
            Sign In
          </Link>{" "}
          &nbsp;
        </>
      
            </nav>
          </div>
    </header>   
     </div>
    
{/* currentUser?.userType === "Admin" ? ( */}
     
      
      <Routes>
        {currentUser ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/company/AddCompanyForm"
              element={<AddCompanyForm />}
            />
            <Route
              path="/company/JoinRequestForm"
              element={
                currentUser&&
              <JoinRequestForm user={currentUser} />}
            />
            <Route path="/company/category/:id" element={<Companies />} />
            <Route path="/Category/CategoryList" element={currentUser ? <CategoryList user={currentUser} />:""} />
            <Route
              path="/user/UserList"
              element={
                currentUser?.userType === "Admin" ? (
                  <UserList />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route
              path="/adminView/Request"
              element={
                currentUser?.userType === "Admin" ? (
                  <RequestList />

                  
                ) : (
                  <HomePage />
                )
              }
            />
            <Route
              path="/company/AddCompanyForm"
              element={
                currentUser?.userType === "Admin" ? (
                  <AddCompanyForm/>

                  
                ) : (
                  <HomePage />
                )
              }
            />

            <Route
              path="/user/UserProfile"
              element={<UserProfile {...currentUser} />}
            />
            <Route
              path="/user/EditProfile"
              element={<EditProfile {...currentUser} editUpdate={editUpdate} />}
            />
            <Route path="/company/category/:id" element={<Companies />} />
            <Route
              path="/company/CompanyDetails"
              element={<CompanyDetails />}
            />
            <Route
              path="/company/CompanyDetails/:id"
              element={<CompanyDetails />}
            />
            <Route
              path="/consultation/consultationList/:company_id"
              element={!!currentUser &&
                <ConsultationList user_fullName={currentUser.user_fullName} />
              }
            />
            {/* <Route
              path="/quotation/QuotationList/user/:id"
              element={<QuotationList />}
            /> */}
            {/* <Route
              path="/quotation/QuotationList"
              element={<QuotationList />}
            />
            <Route
              path="/appointment/AppointmentList"
              element={<AppointmentList />}
            /> */}
            <Route path='/quotation/QuotationList' element={<QuotationList/>} />
            <Route path='/appointment/AppointmentList/:id' element={<AppointmentList /> } />
            <Route path="/consultation/consultationCreateForm/:id" element={<ConsultationCreateForm />} />
            <Route path="/consultation/consultationList/:company_id" element={<ConsultationList />} />
            <Route path="/quotation/QuotationCreateForm/:id" element={<QuotationCreateForm />} />
            <Route path="/consultation/consultationDetails/:consultation_id" element={<ConsultationDetails />} />
          </>
        ) : ( // else
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/company/category/:id" element={<Companies />} />
            <Route path="/consultation/consultationCreateForm/:id" element={<ConsultationCreateForm />} />
            <Route path="/consultation/consultationList/:company_id" element={<ConsultationList />} />
            <Route path="/user/SignUpForm" element={<SignUpForm />} />

            <Route
              path="/user/SignInForm"
              element={<SignInForm login={loginHandler} />}
            />
            <Route
              path="/company/CompanyDetails/:id"
              element={<CompanyDetails />}
            />
            <Route path="/consultation/consultationDetails/:consultation_id" element={<ConsultationDetails />} />

          </>
        )}
      </Routes>
      {/* <footer className="px-3 py-2 text-bg-dark mt-5 stickToBottom">
        <div className="container">
          <p className="mb-1 text-white">&copy; 2024 | Voiture App </p>
        </div>
      </footer> */}
      <footer className="px-3 py-2 text-bg-dark mt-5 stickToBottom">
        <div className="container">
          <p className="mb-1 text-white">&copy; 2024 WeBuild. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
