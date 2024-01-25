import React, { useState , useRef, useEffect } from 'react';
import Map from './Map';
import Axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';

export default function ConsultationCreateForm(props){
// all the states
const [createConsultation, setCreateConsultation] = useState({consultation_land_dimensions: {
  width: {
    unit: 'm', // Default unit (you can change it to the desired default)
  },
  length: {
    unit: 'm', // Default unit (you can change it to the desired default)
  },
},
});


// for map
const [destination, setDestination] = useState(null);
const [location, setLocation] = useState("");
const autocompleteRef = useRef(null);
// adding states for image upload
const [file, setFile] = useState(null);
const [imageUrl, setImageUrl] = useState('');
// adding another state for resetting form, reason is the other method didnt work
const [formKey, setFormKey] = useState(0)
// adding state to for user id
const [users, setUsers] = useState([])



const fechingUser = () => {
  Axios.get('/user/index')
  //Axios.get(`/user/detail?id=${props.id}`)
  .then(res => {
    setUsers(res.data.users)
  })
  .catch(err => {
    console.log('error')
    console.log(err);
  })
}

useEffect(() => {
  fechingUser();
}, [createConsultation.user_id]);



const resetForm = () => {
  setCreateConsultation({consultation_land_dimensions: {
    width: {
      unit: 'm', // Default unit (you can change it to the desired default)
    },
    length: {
      unit: 'm', // Default unit (you can change it to the desired default)
    },
  },
  });
  setFile(null);
  setDestination(null);
 
  setFormKey((prevKey) => prevKey + 1);
};




const handleUnitChange = (e, dimension) => {
  const selectedUnit = e.target.value;

  setCreateConsultation((prevConsultation) => ({
    ...prevConsultation,
    consultation_land_dimensions: {
      ...prevConsultation.consultation_land_dimensions,
      [dimension]: {
        ...prevConsultation.consultation_land_dimensions[dimension],
        unit: selectedUnit,
      },
    },
  }));
};



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateConsultation({ ...createConsultation, [name]: value });
    console.log(createConsultation)
  };

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  }
  const getUser = () => {
    const token = getToken();
    return token ? jwtDecode(token).user : null;
  };
  const getToken = () => {
    const token = sessionStorage.getItem("token");
    return token;
  };

 const {id} = useParams()

  const handleSubmit = (e) => {
   

  const formData = new FormData();
 
  formData.append('consultation_image', file);

  formData.append('user_id', getUser().id);
  formData.append('company', id);
  formData.append('consultation_description', createConsultation.consultation_description);
  formData.append('consultation_land_area', createConsultation.consultation_land_area);
  formData.append('width',createConsultation.width);
  formData.append('length',createConsultation.length);
  
  // formData.append('consultation_land_map', createConsultation.consultation_land_map);
  

    // if (destination){
    //   const { lat, lng} = destination
    //   const coordinates = `${destination.lat},${destination.Ing}`
    //   formData.append('coordinates', coordinates)
    // }

    


  addConsultation(formData);

  resetForm()
 
  e.preventDefault();

};
const addConsultation = (consultations) => {
  Axios.post("/consultations/add", consultations, { headers: {'Content-Type': 'multipart/form-data'}})
  .then(res =>{
  console.log('Consultation has been sent') 

})
 
  .catch(err => {

 console.log('Error cannot Add')
console.log(err) })

}

  return (
   <>
   <br/>
   <h2 className='text-center'>Create Consultation</h2>
   <form key={formKey} onSubmit={handleSubmit}>

   <div className='row d-flex justify-content-center align-items-center'>
          <div className='col-md-6'>
            <label className='form-label'>Client/ Company Id</label>
            <input
              type='text'
              value={props[0]?.user_fullName }
              placeholder="Client/Company id disabled"
              disabled
              className='form-control'
            />
          </div>
        </div>
   <br></br>
    
   <div className='row d-flex justify-content-center align-items-center'>
  <div className='col-md-6'>
    <label className='form-label'>Description</label>
    <textarea
      name='consultation_description'
      value={createConsultation.consultation_description}
      onChange={handleChange}
      className='form-control'
    ></textarea>
  </div>
</div>

<br></br>

  <div className='row d-flex justify-content-center align-items-center'>
  <div className='col-md-6'>
  <label className='form-label'>Layout</label>
  <input type='file'   id="Consultation_image" name='Consultation_image' value={createConsultation.Consultation_image} onChange={handleImage} accept="image/png, image/jpeg, image/gif ,application/pdf" className='form-control'>
  </input>
  </div>
  </div>

 
  {file && (
  <div className='row d-flex justify-content-center align-items-center'>
    <div className='col-md-6'>
      <label>Chosen File</label>
      {file.type.includes('image') ? (
        // Display image if it's an image
        <img
          src={URL.createObjectURL(file)}
          alt='Chosen File'
          style={{ width: '100%', height: 'auto', marginTop: '10px' }}
        />
      ) : (
        // Display link if it's a PDF
        <a
          href={URL.createObjectURL(file)}
          target="_blank"
          rel="noopener noreferrer"
        >
          View PDF
        </a>
      )}
    </div>
  </div>
)}

  <br></br>


  <div className='row d-flex justify-content-center align-items-center'>
  <div className='col-md-6'>
  <label className='form-label'>Land Area (m2)</label>
  <input type='number' name='consultation_land_area' value={createConsultation.consultation_land_area} onChange={handleChange} className='form-control'></input>
  </div>
  </div>

  <br></br>



  <div className="row d-flex justify-content-center align-items-center">
  <div className="col-md-6">
    <label className='form-label'>Land Dimensions</label>
    <div className="d-flex">
      <input
        type="number"
        name="width"
        onChange={handleChange}
        className="form-control mr-2"
        placeholder="Width"
      ></input>

<select
        name="widthUnit"
        value={createConsultation.consultation_land_dimensions.width.unit}
        onChange={(e) => handleUnitChange(e, 'width')}
        className="form-select mr-2 bg-secondary text-light"
        aria-label="Unit"
        style={{ width: '80px' }} 

      >
        {/* <option value="cm">cm</option> */}
        <option value="m">m</option>
        <option value="m²">m²</option>
        <option value="ft">ft</option>
        <option value="in">in</option>

      </select>

      <input
        type="number"
        name="length"
        
        onChange={handleChange}
        className="form-control"
        placeholder="Length"
      ></input>

<select
        name="lengthUnit"
        value={createConsultation.consultation_land_dimensions.length.unit}
        onChange={(e) => handleUnitChange(e, 'length')}
        className="form-select mr-2 bg-secondary text-light"
        aria-label="Unit"
        style={{ width: '80px' }}>


        {/* <option value="cm">cm</option> */}
        <option value="m">m</option>
        <option value="m²">m²</option>
        <option value="ft">ft</option>
        <option value="in">in</option>
        
      </select>


    </div>
  </div>
</div>




  <br></br>

<div className='row d-flex justify-content-center align-items-center text-center'>
    <div  className='col-md-6'>
        <input type='submit' value="Create Consultation" className='btn btn-secondary'></input>
    </div>
    </div>

   </form>
  
   
   </>

  )   
  





  }























// import React, { useState } from 'react'

// export default function consultationCreateForm(props) {

// const [createConsultation, setCreateConsultation] = useState({})



// const eventHandler = (e) => {
//     const attributeToChange = e.target.name
//     const newValue = e.target.value
    
//     const consultation = {...createConsultation}
//     consultation[attributeToChange] = newValue
//     console.log(consultation)
//     setCreateConsultation(consultation)
// }

// const submitEventHandler = (e) => {
//     e.preventDefault()
//     props.addAConsultation(createConsultation)
//     e.target.reset()
// }

// return(

   
//         <form onSubmit={handleSubmit} className="mt-3">
//           {Object.entries(initialFormData).map(([field, initialValue]) => (
//             <div key={field} className="mb-3">
//               <label htmlFor={field} className="form-label">{field.replace('_', ' ')}</label>
//               <input
//                 type={field.includes('image') ? 'file' : 'text'}  // Assuming image fields are file inputs
//                 className="form-control"
//                 id={field}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//               />
//             </div>
//           ))}
      
//           <button type="submit" className="btn btn-primary">Create Consultation</button>
//         </form>
     
      
// )





// }















//   return (
//     <>
    
    
    
    
    
    
    
    
    
    
    
    
//     </>
//   )
// }
