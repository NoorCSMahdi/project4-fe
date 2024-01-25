
import Axios from 'axios';
import Map from './Map';
import React, { useState, useEffect ,useRef} from 'react';
import { useNavigate } from 'react-router-dom'



export default function EditCompanyForm(props) {
  const [editCompany, setEditCompany] = useState(props.editCompany);
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState(null);
  const autocompleteRef = useRef(null);
  const [file, setFile] = useState(props.editCompany.company_image);
  const [imageName, setImageName] = useState(null);
  editCompany.user = sessionStorage.getItem("UserId");
  const navigate = useNavigate();
  // useEffect(()=>{
  //   loadCategoriesList();
  // }, [])

  
  const successCallback = (position) => {
    console.log("coor",position.coords);
    const newLocation = {
      latitude:position.coords.latitude,
      longitude: position.coords.longitude
    }
    setLocation(newLocation)
    console.log("newLocation", newLocation)
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
  // Move this line inside the component body
  // navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    const company = { ...editCompany };
    company[attributeToChange] = newValue;
    setEditCompany(company);
    console.log(company);
  };

  const handleMapClick = (e) => {
    console.log(e);
    setDestination(e.latlng);
  };

  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setDestination({ lat: latitude, lng: longitude });
          console.log(latitude, longitude);
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("company_image", file);
    formData.append("company_name", editCompany.company_name);
    formData.append("company_description", editCompany.company_description);
    formData.append("company_phoneNumber", editCompany.company_phoneNumber);
    formData.append("company_emailAddress", editCompany.company_emailAddress);
    // formData.append("company_latitude", destination.lat);
    // formData.append("company_longtude", destination.lng);
    // console.log("newCompany.company_location", location)
    formData.append("working_days", editCompany.working_days);
    formData.append("_id",editCompany._id)
    // formData.append("exb",editCompany)
    // formData.append("Categories", newCompany.Categories);
    console.log(formData)

    Axios.put("/company/update",formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res=>{
      console.log(res);
      console.log("success");
      props.isEdit(false);
      navigate("/company/index");
    })
    .catch(err=>{
      console.log(err);
    })
    
    // try {
    //   const result = await Axios.post('/company/add', formData, { headers: {'Content-Type': 'multipart/form-data'}});
    //   setImageName(result.data.imageName);
    //   console.log('Company Added successfully!!!');
    // } catch (error) {
    //   console.log('Error adding Company:', error);
    // }
    event.target.reset();
  };

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Edit Your Company</h2>
        <p>A Chance To Display Your Company!</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="company_name" className="form-label">
            Company Name:
          </label>
          <input required
            type="text"
            className="form-control"
            id="company_name"
            value={editCompany.company_name}
            name="company_name"
            onChange={handleChange}
          />
        </div>
        {/* <div className="mb-3"> 
         <div>
          <label>User</label>
          <input type='text' name='user' onChange={handleChange} value={newCompany.user} disabled></input>
        </div>
        </div>
       */}
         
          {/* <div class="mb-3">
          <select type="number" class="form-control" id="floatingInput"  name="Categories" value={categories.Categories} onChange={handleChange} >
          <option value="">Select an option</option>
            {categories.map((category, index) => (
            <option key={index} value={category._id}>
            {category.name}
          </option>
        ))}
            </select>
            
          <label for="floatingInput">categories</label>
        </div> */}

        <div className="mb-3">
      <label htmlFor="company_description" className="form-label">
        Description of the Company:
      </label>
      <input required
        type="text"
        className="form-control"
        id="company_description"
        name="company_description"
        value={editCompany.company_description}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="company_phoneNumber" className="form-label">
        Business' Contacts:
      </label>
      <input required
        type="text"
        className="form-control"
        id="company_phoneNumber"
        name="company_phoneNumber"
        value={editCompany.company_phoneNumber}
        onChange={handleChange}
      />
    </div>

    <div className="mb-3">
      <label htmlFor="company_emailAddress" className="form-label">
        Business Email-Address:
      </label>
      <input required
        type="email"
        className="form-control"
        id="company_emailAddress"
        name="company_emailAddress"
        value={editCompany.company_emailAddress}
        disabled
      />
    </div><div className="mb-3">
  <label htmlFor="company_image" className="form-label">
    Upload Company Images:
  </label>
  <input 
    type="file"
    className="form-control"
    id="company_image"
    name="company_image"
    accept=".png, .jpg, .jpeg, .gif"
    onChange={handleImage}
  />
</div>

{/* <div className="mb-3">
  <label htmlFor="working_days" className="form-label">
    Working Days:
  </label>
  <input required
    type="date"
    className="form-control"
    id="working_days"
    name="working_days"
    onChange={handleChange}
    value={editCompany.working_days}
  />
</div> */}

        <div className="mb-3">
          <label htmlFor="company_location" className="form-label">
            Company Location:
          </label>
          <Map destination={destination} key={destination&& destination.lat || 2}/>
          
          <button type="button" onClick={fetchCurrentLocation}>Get Current Location</button>
        </div>

        {/* Rest of the form fields */}

        <div className="mb-3">
          <input type="submit" value="Edit Company" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}