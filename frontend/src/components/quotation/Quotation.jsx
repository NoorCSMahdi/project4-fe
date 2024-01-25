import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {Link} from 'react-router-dom'
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime"; 
// dayjs.extend(relativeTime);

export default function Quotation(props) {
  return (
    <>

    <td>{props.index}</td>
    <td>{props.consultation}</td>
    <td>{props.description}</td>
    <td>{props.date}</td>
    <td>{props.location}</td>
    <td>{props.quantity}</td>
    <td>{props.price}</td>
    <td>{props.notes}</td>
    <td>
    <button type="button" onClick={() => props.editView(props._id)} className="btn btn-link"> <i className="bi bi-pencil-fill text-dark"></i></button> 
    <button type="button" onClick={() => props.deleteQuotation(props._id)} className="btn btn-link"><i className="bi bi-trash-fill text-dark"></i></button>
    </td>
    </>
  )
}

