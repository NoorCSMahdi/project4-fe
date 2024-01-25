import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'


export default function Category(props) {
  
  useEffect(() => {
    console.log(props.user);
  }, [])
  


  return( 
    <>
   
    <div className="col-md-4" >
         <div className="card shadow-sm my-card">
         <Link to={`/company/category/${props._id}`}>
         <img src={props.image} className="card-img-top" style={{ width: "100%", height: "auto", objectFit: "contain" }} alt={props.name} />
         </Link>
           
          <div className="card-body text-bg-dark">
            <h5 className="card-title">{props.name}</h5>
          
           <div className='d-flex justify-content-between'>
           <div className="btn-group">
            {/* {props.user? <h1>{props.user.userType}</h1>:"NO"} */}
           {props.user && (props.user.userType=="Admin")? 
           <>
            <button  type="button" className="btn btn-sm btn-outline-light" onClick={()=> props.editView(props._id)}>Edit</button>
            <button  type="button" className="btn btn-sm btn-outline-light" onClick={()=> props.deleteCategory(props._id)}>Delete</button></>:""}  </div>
           
         </div>
          </div>

         </div>
    </div>
  
    
    </>
  )
  
}
