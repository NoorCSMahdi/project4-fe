import React from 'react';
import { Link, useParams } from 'react-router-dom'; // Import the Link component from react-router-dom
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jwtDecode } from 'jwt-decode';
//import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import Axios from 'axios'; //AJAX functionality for React (npm i axios)
import Quotation from './Quotation';
import QuotationCreateForm from './QuotationCreateForm';
import QuotationEditForm from './QuotationEditForm';
import dummyData from './dummy';


export default function QuotationList(props) {
const [quotations, setQuotation] = useState([]); //this is used for Create
const [currentQuotation, setCurrentQuotation] = useState({}); //this is used to set the content for the Edit form
const[isCreateQuotation,setIsCreateQuotation]=useState(false);
const[isEditQuotation,setIsEditQuotation]=useState(false);

// const passToken = { headers: { "Authorization": "Bearer " + localStorage.getItem("token")}};

// const passToken = passedToken;

const {id} = useParams()
console.log("id", id )
// const [editCompany, setEditCompany] = useState({});
// const [isEdit,setIsEdit]=useState(false);
  // Fetch user ID from the token
  const userId = jwtDecode(sessionStorage.getItem('token')).user.id;

//   useEffect(() => {
//     // Fetch quotations for the logged-in user from the API
//     Axios.get(`/quotation/get?user_id=${userId}`)
//       .then(response => {
//         setQuotation(response.data.quotations);
//       })
//       .catch(error => {
//         console.error('Error fetching quotations:', error);
//       });
//   }, [userId]);
// useEffect(() => {
// //call API
useEffect(() => {
    loadQuotationList();
},[]);

const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token).user : null;
  };
  const getToken = () => {
    const token = sessionStorage.getItem("token");
    return token;
  };


//using axios for the API fetching GET 
const loadQuotationList = () => {
    // setQuotation(dummyData)
const user= getUser();
const userType= sessionStorage.getItem("userType");
Axios.get('/quotation/get?id='+user.id+'&userType='+userType,{headers:{
    "Authorization":`Bearer ${getToken()}`
}})
//Axios.get('/quotation/index')
.then((response) => {
console.log("setQuotation",response);
setQuotation(response.data.quotations);
})
.catch((error) => {
console.log(error);
})
};
//loadQuotationList();
//create the API for creating the Quotation
const addQuotation = (quotation) => {
    Axios.post("/quotation/add",quotation,{headers:{
        "Authorization":`Bearer ${getToken()}`
    }})
    .then(res =>{
        console.log(res);
                    console.log("Quotation Added!");
                    loadQuotationList();
                    setIsCreateQuotation(false)
                })
                .catch((err) =>{
                    console.log("Error in adding Quotation !");
                    console.log(err);
                })
            }

//create the API for preparing the content for the Edit Form
const editView = (id) => {
// console.log(passToken)
Axios.get(`/quotation/edit?id=${id}`)
.then( ( res ) => {
    // console.log("Loaded Quotation Information");
    // console.log(res.data.quotation);
    let quotation = res.data.quotation;
    setIsEditQuotation(true);
    setCurrentQuotation(quotation);
})
.catch((error) => {
    console.log("Error loading quotation Information: ");
    console.log(error);
})
}

//create the API for Update Quotation 
const updateQuotation = (quotations) => {
Axios.post("/quotation/update",quotations)
.then(( res ) => {
    console.log("Quotation Updated Successfully!");
    console.log(res);
    setIsCreateQuotation(false);
    setIsEditQuotation(false); //reset to hide the form again
    loadQuotationList();
})
.catch((error) => {
    console.log("Error Updating Quotation Information: ");
    console.log(error); 
})
}

//create Delete API to Delete Quotation
const deleteQuotation = (id) => {
Axios.get(`/quotation/delete?id=${id}`)
.then(( res ) => {
    // console.log(res);
    console.log("Quotation Deleted Successfully!");
    loadQuotationList();
})
.catch((error) => {
    console.log("Error finding the Quotation Information: ");
    console.log(error);
})
}

//return arrow function with normal bracket as it treats this as one value
const allQuotation = quotations.map((quotation, index) => (
    
    <tr key={index}>
    {/* <Quotation name={quotation.name} emailAddress={quotation.emailAddress} index={index} /> */}
    {props.user?.userType == "User" ? ( quotation.user == props.user._id ? 
    <> 
    
   
        <Quotation { ...quotation} index={index+1} editView={editView} deleteQuotation={deleteQuotation} isEditQuotation={isEditQuotation} setIsEditQuotation={setIsEditQuotation} />
    </>
    :
    <><br /><p className="text-white">  End of Contribution List</p></>
    ) : 
    <> 
        <Quotation { ...quotation} index={index+1} editView={editView} deleteQuotation={deleteQuotation} isEditQuotation={isEditQuotation} setIsEditQuotation={setIsEditQuotation} />
    </>
    }
</tr>    
))

return (
<>



<div className="container py-5 mb-5">

    {(isCreateQuotation) ?
    <>
    <QuotationCreateForm addQuotation={addQuotation} isCreateQuotation={isCreateQuotation} setIsCreateQuotation={setIsCreateQuotation } />
    </>
        : 
    
    (isEditQuotation) ?
        <>
        <QuotationEditForm userID={props.userID} key={currentQuotation._id} quotation={currentQuotation} editView={editView} updateQuotation={updateQuotation} isEditQuotation={isEditQuotation} setIsEditQuotation={setIsEditQuotation} />
        </>
    :
    <>
    {/* <button onClick={() => setIsCreateQuotation(true)} className="btn btn-primary">Add Quotation</button> */}
    <br />
    <br />
    <h5> Quotation List</h5>
    <table className="table">
    <tbody>
        <tr className="table-success">
        <th>No.</th>
        <th>Consultation Id</th>
        <th>Description</th>
        <th>Date / Time</th>
        <th>Location</th>
        <th>Quantity (m2) </th>
        <th>Price (BHD) </th>
        <th>Notes </th>
        <th></th>
        </tr>
            { allQuotation != null ? allQuotation : "No data" }
        </tbody>
    </table>
</>
}
</div>


</>
)

}

