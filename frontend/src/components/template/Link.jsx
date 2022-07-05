import React from "react";
import {Link} from 'react-router-dom'
import './Link.css'

export default props=>
    <Link to={props.link}>
        <i className={`fa fa-${props.icon}`}></i>
        {props.linkName}
    </Link>