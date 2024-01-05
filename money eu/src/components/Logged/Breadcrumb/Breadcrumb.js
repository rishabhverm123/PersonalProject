import { useEffect, useState } from 'react';
import './Breadcrumb.css'

export const Breadcrumb=(props)=>{

const [data,setData]=useState(props.breadcrumb)
    const default_breadcrumb={icon:'home', name:'Home',selected:false};



    useEffect(()=>{
        let new_data=[...data];
        new_data.unshift(default_breadcrumb);
        setData(new_data);
    },[])

    const capitalizeFirstLetter = (str) => { return str.charAt(0).toUpperCase() + str.slice(1)}

    return(
        <div className="breadcrumb-wrapper text-start">
            <ul className="breadcrumbs">
            {

data.map((item,index)=>{
    const class1 = index===0 ? " first" : "";
    const class2 = index===data.length-1?'last' : "";
    const class3 = item.selected?'active':'';
    return(
        
        <li key={index} className={`${class1} ${class2} ${class3}`}>
            <span><i className={`fa fa-${item.icon} mx-1`}></i>{capitalizeFirstLetter(item.name)}</span>
        </li>
    )
})
}
            </ul>

        </div>
        
    )
}