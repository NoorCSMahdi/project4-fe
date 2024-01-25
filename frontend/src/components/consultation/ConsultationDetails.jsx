import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import QuotationEditForm from '../quotation/QuotationEditForm';
import { Link } from 'react-router-dom';


export default function ConsultationDetails() {
    const { consultation_id } = useParams()
    console.log(consultation_id)

    const [quotation, setQuotation] = useState([])

    useEffect(() => {
        // Fetch companys from the API
        Axios.get(`/consultations/consultationDetails?consultation_id=${consultation_id}`)
          .then(response => {
            console.log(response)
            setQuotation(response.data.quotation);
          })
          .catch(error => {
            console.error('Error fetching quotations:', error);
          });
      }, []);

  return (
    <div  class="container mt-4"><h1>Consultation / Quotation Details</h1>
        <div class="card">
        <div class="card-body">
            <strong>Description: </strong> <span></span>
             <label>{quotation[0]?.description}</label>
        </div>
        <div class="card-body">  
        <strong>Location: </strong> <span></span>
          <label> {quotation[0]?.location}</label>  
             
        </div>
        <div class="card-body">
        <strong>Date/Time: </strong> <span></span>
        <label>{quotation[0]?.date}</label>
        </div>
       
        <div class="card-body">
        <strong >Quantity (m2):</strong> <span></span>
        <label>{quotation[0]?.quantity}</label>
        </div>
        <div class="card-body">
        <strong>Price: (BHD) </strong> <span></span>
            <label>{quotation[0]?.price}</label>
        </div>
        <div class="card-body">
        <strong>Notes(s): </strong> <span></span>
        <label>{quotation[0]?.notes}</label>    
        </div>
    </div>
        <Link  to={`/quotation/QuotationEditForm/${consultation_id}`}>Add Quotation</Link>
    </div>
  )
}
