import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom';
import Axios from 'axios';
import Map from '../company/Map';
import AddCompanyForm from '../company/AddCompanyForm';
import EditCompany from './EditCompany'


export default function CompanyDetailPage(props) {
  const [companyData, setCompanyData] = useState([]);
  const [company, setCompany] = useState({
    company_latitude:0,
    company_longtude:0
  });
  
  const { id: companyId } = useParams();
  const navigate = useNavigate();
  const [EditCompany, setEditCompany] = useState({});
  const [isEdit,setIsEdit]=useState(false);


  useEffect(() => {
    // Fetch cars for the specific company
    Axios
      .get(`/company/detail?id=${companyId}`)
      .then(response => {
        console.log('response', response);
        let lat = parseFloat(response.data.company.company_latitude);
        let long = parseFloat(response.data.company.company_longitude);
        console.log('lat', lat, '\nlong', long);
        if(isNaN(lat)){
          lat = 0;
        }
        if(isNaN(long)){
          long = 0;
        }
        response.data.company.company_latitude = lat;
        response.data.company.company_longtude = long;
        setCompany(response.data.company ? response.data.company : []);
      })
      .catch(error => {
        console.error('Error fetching company:', error);
      });
  }, [companyId]);
  
  console.log("///", companyData);

  const deleteCompany=(id)=>{
    Axios.delete(`/company/delete?id=${id}`)
    .then(res=>{
      console.log("company deleted");
      console.log(res);
      navigate('/')
    })
    .catch(err=>{
      console.log("error deleting company",err);
    })
  }


  // const editCompanyFun = (id) => {
  //   Axios.get(`/company/edit?id=${id}`)
  //     .then((res) => {
  //       console.log('Exhibition Added successfully!!!');
  //       setEditCompany(res.data.company)
  //       setIsEdit(!isEdit)
  //     })
  //     .catch((err) => {
  //       console.log('Error adding Exhibition');
  //     });
  // };

  const handleEditCompany = (carId) => {
    navigate(`/company/edit/${carId}`);
  };

  return (
    <>
      <h1 className="text-center">Companies</h1>
      <div className="container mt-5 mb-4 d-flex align-items-center justify-content-center">
        <div key={company._id} className="card mb-3">
          <div className="card-body">
            <h2 className="card-title"> Name: {company.company_name}</h2>
            <img src={company.company_images} alt={company.company_name} className="card-img-top" style={{ width: '100/%', height: '60%', objectFit: 'cover',alignItems:'center' }} />
            <p className="card-text"><strong>Company Description:</strong> {company.company_description}</p>
            <p className="card-text"><strong>Business Email-Address:</strong> {company.company_emailAddress}</p>
            <p className="card-text"><strong>Business Contacts:</strong> {company.company_phoneNumber}</p>
            <p className="card-text"><strong>Coordinates Lapidate: </strong>{company.company_latitude}</p>
            <p className="card-text"><strong>Coordinates Longitude:</strong> {company.company_longtude}</p>
            <Map destination={[company.company_latitude, company.company_longtude]} ></Map>
            
          </div>
        </div>
        </div>
        <div className='text-center'>
        <button className='btn btn-danger' style={{marginRight:"5px"}} onClick={()=>deleteCompany(companyId)}>Delete Company</button>

        <button className='btn btn-primary' onClick={()=>handleEditCompany(company._id)}>Edit</button>
       
       
            
        <Link to={`/consultation/consultationCreateForm/${company._id}`} className='btn btn-dark mr-2'>Add Consultation</Link> &nbsp;&nbsp;
        <Link to={`/consultation/consultationList/${company._id}`} className='btn btn-dark'>Consultation List</Link>
        </div>
    </>
  )
}