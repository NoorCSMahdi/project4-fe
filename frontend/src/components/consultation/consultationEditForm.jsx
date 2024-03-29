import React, { useState, useRef, useEffect } from 'react';
import Map from './Map';
import Axios from 'axios'


export default function ConsultationEditForm(props){

  const [editConsultation, setEditConsultation] = useState({
    ...props.currentConsultations,
    consultation_land_dimensions: {
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
// for image update
const [file, setFile] = useState(props.currentConsultations.consultation_image );
const [formKey, setFormKey] = useState(0)
const [users, setUsers] = useState([])



const fechingUser = () => {
  Axios.get('/user/index')
  
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
}, [editConsultation.user_id]);



const handleUnitChange = (e, dimension) => {
  const selectedUnit = e.target.value;

  setEditConsultation((prevConsultation) => ({
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




const resetForm = () => {
  setEditConsultation({consultation_land_dimensions: {
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
  // Reset other relevant state variables
  setFormKey((prevKey) => prevKey + 1);
};


  const handleChange = (e) => {
    const attributeToChange = e.target.name
    const newValue = e.target.value

    const updateConsultation = {...editConsultation }
    updateConsultation[attributeToChange] = newValue
    console.log(updateConsultation)
    setEditConsultation(updateConsultation)

  };

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault()
    
  const formData = new FormData();
  
  formData.append('consultation_image', file);
  formData.append('_id', props.currentConsultations._id)

  formData.append('consultation_description', editConsultation.consultation_description);
  formData.append('consultation_land_area', editConsultation.consultation_land_area);
  formData.append('width',editConsultation.width);
  formData.append('length',editConsultation.length);
  // formData.append('consultation_land_map', editConsultation.consultation_land_map);
  // formData.append('consultation_land_autocad', createConsultation.consultation_land_autocad);

    props.updateTheview(formData)
    resetForm()

  };

  return (
   <>
   <h2 className='text-center'>Edit Consultation</h2>
   <form key={formKey}  onSubmit={handleSubmit}>
    
    
   <div className='row d-flex justify-content-center align-items-center'>
          <div className='col-md-6'>
            <label>Client</label>
            <input
              type='text'
              value={props.user_fullName}
              disabled
              className='form-control'
            />
          </div>
        </div>
    <br></br>

  

   <div className='row d-flex justify-content-center align-items-center'>
  <div className='col-md-6'>
    <label>Description</label>
    <textarea name='consultation_description' value={editConsultation.consultation_description} onChange={handleChange}className='form-control'>
    </textarea>
  </div>
</div>

<br></br>

  <div className='row d-flex justify-content-center align-items-center'>
  <div className='col-md-6'>
  <label>Location Image</label>
  {/* using file for images */}
  <input type='file' id='Consultation_image' name='Consultation_image' value={editConsultation.Consultation_image} onChange={handleImage}   accept="image/png, image/jpeg, image/gif" className='form-control'></input>
  </div>
  </div>


 
  {file && (
  <div className='row d-flex justify-content-center align-items-center'>
    <div className='col-md-6'>
      <label>Chosen File</label>
      <div
                style={{ width: '50vw', height: 'auto', marginTop: '10px' }}
      >
      <img
          src={file}
          alt={editConsultation.consultation_description}
          style={{ width: '100%', height: 'auto', marginTop: '10px' }}
          />
          </div>
      {/* <img /> */}
      {/* {file.type.includes('image') ? ( */}
      {/* {file ? (
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
      )} */}
    </div>
  </div>
)}

  <br></br>

  <div className='row d-flex justify-content-center align-items-center'>
  <div className='col-md-6'>
  <label>Land Area</label>
  <input type='text'  name='consultation_land_area' value={editConsultation.consultation_land_area} onChange={handleChange}  className='form-control'></input>
  </div>
  </div>

  <br></br>



<div className="row d-flex justify-content-center align-items-center">
  <div className="col-md-6">
    <label>Land Dimensions</label>
    <div className="d-flex">
      <input
        type="text"
        name="width"
        onChange={handleChange}
        className="form-control mr-2"
        placeholder="Width"
      ></input>

<select
        name="widthUnit"
        value={editConsultation.consultation_land_dimensions.width.unit}
        onChange={(e) => handleUnitChange(e, 'width')}
        className="form-select mr-2 bg-secondary text-light"
        aria-label="Unit"
        style={{ width: '80px' }} 

      >
        <option value="cm">cm</option>
        <option value="m">m</option>
        <option value="m²">m²</option>
        <option value="ft">ft</option>
        <option value="in">in</option>

      </select>

      <input
        type="text"
        name="length"
        
        onChange={handleChange}
        className="form-control"
        placeholder="Length"
      ></input>

<select
        name="lengthUnit"
        value={editConsultation.consultation_land_dimensions.length.unit}
        onChange={(e) => handleUnitChange(e, 'length')}
        className="form-select mr-2 bg-secondary text-light"
        aria-label="Unit"
        style={{ width: '80px' }}>


        <option value="cm">cm</option>
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
        <input type='submit' value="Edit Consultation" className='btn btn-secondary'></input>
    </div>
    </div>

   </form>
  
   
   </>

  )   
  





  }




















