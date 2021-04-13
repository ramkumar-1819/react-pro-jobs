import React, { Component,useEffect } from 'react';

//this Component is used to display the page numbers based on the datas that we got and per page has 10 jobs
//maximum 3 page Number Buttons is Visible to User
export default function Page(props){
    useEffect(()=>{                  //Afetr every click on pagenumber only clicked pageNumber is styled blue color and others are styled by default color
        props.pages.forEach((val,index)=>{
           if(val!==pgno){
               document.getElementsByClassName("btns")[index].style.backgroundColor="white";
               document.getElementsByClassName("btns")[index].style.color="black";
           }
           else{
           document.getElementsByClassName("btns")[index].style.backgroundColor="blue";
           document.getElementsByClassName("btns")[index].style.color="white";
           }
        })
    })
    var pgno=props.pgno;
    const forward=()=>{ //when forward button is clicked - move to the next page and display based on the pagenumber
        if(pgno+1>3 && pgno+1<=props.totalPages){
                var updated_frd_pages=props.pages
                updated_frd_pages.shift()
                updated_frd_pages.push(pgno+1)
                props.setpageButton(updated_frd_pages)
        }
        if(pgno+1<=props.totalPages){
        props.setPageno(pgno+1)
        }
    }
    const backward=()=>{   //when backward button is clicked - move to the previous page and display based on the pagenumber
        if(pgno>3){
            var updated_bkd_pages=props.pages
            updated_bkd_pages.pop()
            updated_bkd_pages.unshift(pgno-3)
            props.setpageButton(updated_bkd_pages)
        }
        else if(pgno<=3 && props.totalPages>=3){
            props.setpageButton([1,2,3])
        }
        if(pgno-1!==0){
        props.setPageno(pgno-1)
        }
    }
    const updatePage=(val)=>{  //setting the pagenumber to usestate hook in parent component
        props.setPageno(val)
    }

    return(
        <div className="pages">
        {pgno>1 &&
        <button onClick={backward}>˃</button>
        }
        {props.pages.map((val,index)=>
        <button className="btns" onClick={()=>updatePage(val)}>{val}</button>
        )}
        {props.totalPages!==pgno &&
        <button onClick={forward}>˂</button>
        }
        </div>
    )
}