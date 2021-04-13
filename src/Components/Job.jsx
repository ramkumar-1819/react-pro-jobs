import React, { Component } from 'react';

export default function Job(props){
    const dates=(val)=>{        //Showing the date that the job is Published
        var date=new Date(val);
        var new_date=`${date.toLocaleDateString()}`
        return new_date;
    }
    const view=(e,index,val)=>{   //When Viewdetail button is clicked , then we need to show the details of the job
      document.querySelectorAll(".description")[index].innerHTML=val.description
      document.getElementsByClassName("description")[index].classList.toggle("show")
      e.target.innerHTML=e.target.innerHTML==="View Details"?"Hide Details":"View Details"
    }
    return(
        <>
        {props.datas.map((val,index)=>
        <div className="job" key={index}>
        <div className="post_logo">
           <div>
              <div className="title">{val.title}-<span>{val.company}</span></div>
              <div>{dates(val.created_at)}</div>
           </div>
           <img src={val.company_logo} alt="logo"/>
        </div>
        <div className="type">
        <div>{val.type}</div>
        <div>{val.location}</div>
        </div>
        <div><a href={val.url}>{val.url}</a></div>
        <button onClick={(e)=>view(e,index,val)}>View Details</button>
        <div className="description"></div>
        </div>
        )}  
        </>
    )
}