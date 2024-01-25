import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';




export default function QuotationCreateForm(props) {
    

const QuotationForm = () => {
    const [formData, setFormData] = useState({
        
       
    });
}



const [consultation, setConsultation] = useState([]);

useEffect(() => {
    //call API
    loadConsultationList(); 
       
},[]);


//for quotation form
const loadConsultationList = () => {
// Axios.get("/consultations/index", props.Token)
Axios.get("/consultations/index")
.then((response) => {
console.log(response);
setnewQuotation(prev => ({...prev, consultation:response.data.consultations[0]._id}))
setConsultation(response.data.consultations);
})
.catch((error) => {
console.log(error);
})
};

const [newQuotation , setnewQuotation] = useState({});

newQuotation.user = sessionStorage.getItem("UserId");
const[newPrice, setNewPrice] = useState("");
const[newLong, setNewLong] = useState("");

const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
const [loading, setLoading] = useState(false);
const [url, setUrl] = useState("");

const handleChange = (event) => { 
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const quotation = {...newQuotation};
    quotation[attributeToChange] = newValue;
    console.log(quotation);
    setnewQuotation(quotation);


} 

const [selectConsultation , setSelectConsultation] = useState("");
const [selectedConsultationInfo , setSelectedConsultationInfo] = useState();

const handleConsultationChange = (event) => { 
    const attributeToChange = event.target.name;
    const newConsultation = event.target.value;

    console.log(newConsultation);

    setSelectConsultation(newConsultation);

    const quotation = {...newQuotation};
    quotation[attributeToChange] = newConsultation;
    setnewQuotation(quotation);
    consultationView(newConsultation);
} 

const {id} = useParams()
const handleSubmit = (event) =>{
  const formData = new FormData();
  

  formData.append('user', getUser().id);
  formData.append('consultation', id);

  addQuotation(newQuotation);

  event.preventDefault();
}

const addQuotation = (quotation) => {
  Axios.post("/quotation/add",quotation,{headers:{
    "Authorization":`Bearer ${getToken()}`
}})
  .then(res =>{
      console.log(res);
                  console.log("Quotation Added!");
                  // loadQuotationList();
                  // setIsCreateQuotation(false)
              })
              .catch((err) =>{
                  console.log("Error in adding Quotation !");
                  console.log(err);
              })
          }

const consultationView = (id) => {
  console.log(id)
Axios.get(`/consultations/detail?id=${id}`)
//Axios.get('/consultations/index')
.then( ( res ) => {
    console.log("Loaded Consultation Info");
    //console.log(res.data.consultations);
    // let consultation = res.data.consultations;

    setSelectedConsultationInfo(res.data.consultations);

})
.catch((error) => {
    console.log("Error loading Consultation Information: ");
    console.log(error);
})

// const UserAttrib = "User";
// quotation[UserAttrib] = props.userID;

// setnewQuotation(quotation);
// console.log(quotation);      
}

// Wael upload image cahnges 
const [formData, setFormData] = useState({});

// console.log("consultation ", consultation)

const getUser = () => {
  const token = getToken();
  return token ? jwtDecode(token).user : null;
};
const getToken = () => {
  const token = sessionStorage.getItem("token");
  return token;
};

  return (
    <div className="container py-1 mb-5">
        <h1>Quotation for Inquire </h1>
        

        <div className="row g-5">

        <div className="col-md-6 col-lg-6">
        <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3 pb-1"> 
          <label>User</label>
          <input type='text' name='user' onChange={handleChange} value={newQuotation.user} disabled></input> id
        </div>
        {/* <div>
          <label>company</label>
          <input type='text' name='company' onChange={handleChange} readOnly></input> id
        </div> */}
        <div className="mb-3 pb-1">
  <label htmlFor="consultation" id="consultation" className="form-label">Consultation: </label> 
  <select  name="consultation" className="form-select" onChange={handleConsultationChange} required>
    <option value="" disabled>
      Select a monitored Consultation
    </option>
    { consultation.length > 0 ?

    consultation.map((consult) => (
      <option value={consult._id}>
        {consult.consultation_description}
      </option>
    ))
    :
    null}
  </select>
</div>

            {/* <div className="mb-3 pb-1">
                <label htmlFor="date" className="form-label">Date</label>
                <input type="text" className='form-control' name="date" onChange={handleChange}></input>
            </div> */}

            <div className="mb-3 pb-1">
            <label htmlFor="date" className="form-label"> Date / Time </label> 
            {/* <input type="time" className='form-control' name="time" onChange={handleChange}></input> */}
            <input type="datetime-local" className="form-control" id="date" name="date" onChange={handleChange} required/>


            </div>
            {/*             
            <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Time/Date:
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.dateTime}
                  onChange={handleChange}
                />
              </div> */}


            <div className="mb-3 pb-1">
                <label className="form-label"> Description </label>
                <textarea type="text" className='form-control' name="description" onChange={handleChange} required/>
            </div>


         

            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="location" className="form-label">Location: </label>
                    <input type="text" className='form-control' id="location" name="location"  onChange={handleChange} required />
                </div>
            </div>
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="quantity" className="form-label"> Quantity (m2): </label>
                    <input type="number" className='form-control' id="quantity" name="quantity" onChange={handleChange} required /> 
                </div>
           
            <div className="col-sm-6">
                <div className="mb-3 pb-1">
                    <label htmlFor="price" className="form-label"> Price (BHD): </label>
                    <input type="number" className='form-control' id="price" name="price"  onChange={handleChange} required />
                </div>
            </div>
            </div>
            <div className="mb-3">
                <label htmlFor="notes" className="form-label"> Note:</label>
                <textarea className="form-control" id="notes" name="notes" value={formData.note} onChange={handleChange}></textarea>
            </div>
            <div className="mb-3 pb-1">
                <button onClick={ () => props.setIsCreateQuotation(false) } className="btn btn-secondary me-2">Cancel</button>
                <input className='btn btn-primary' type="submit" value="Add Quotation" />
            </div>
            
        </form>
        </div>

        <div className="col-md-6 col-lg-6">
              
              

          

            <div>
                {selectConsultation}<br />
                { selectedConsultationInfo ? JSON.stringify(selectedConsultationInfo) : "" } 
            </div>
        </div>

        </div>
        
    </div>
  )
}
