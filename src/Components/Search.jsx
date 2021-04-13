import React, { Component } from 'react';

export default function Search(props){
    //Based on the Search value we need to show datas related to search
    //There are totally two search bars ie(Location and Job Description)
    
    //Showing the total PageNumbers based on the search
    const page_num_handler=(para)=>{
        if(para.length>0){
            console.log(para)
            var totalPages=Math.ceil(para.length/10);
            console.log(totalPages)
            props.settotalPages(totalPages)
            if(totalPages>3){
             props.setpageButton([1,2,3])
            }
            else{
                var new_page=[]
                for(var i=0;i<totalPages;i++){
                    new_page.push(i+1)
                }
                props.setpageButton(new_page)
             }
        }
    }
    const changeHandler=(e,type)=>{
        props.setPageno(1)

        //Only Job description is entered and Location is not entered
        if(type==="description"){
            if(props.search.location==="" && e.target.value!==""){
                var newData=props.realData.map(val=>{
                    var pattern=new RegExp(e.target.value,"i")
                    if(val.title.search(pattern)>=0){
                        return val
                    }
                    return undefined
                }).filter(val=>val!==undefined)
                if(newData.length>0){
                    props.setDatas(newData)
                    props.searchhandler(e.target.value,"description")
                    page_num_handler(newData)
                }
                else{
                    alert("No Match Found")
                }
            }
            //If both field are cleared 
            else if(props.search.location==="" && e.target.value===""){
                props.setDatas(props.realData)
                props.searchhandler(e.target.value,"description")
                page_num_handler(props.realData)
            }
            //Both field are entered with some values
            else if(props.search.location!=="" && e.target.value!==""){
                var newData1=props.datas.map(val=>{
                    var pattern=new RegExp(e.target.value,"i")
                    if(val.title.search(pattern)>=0){
                        return val
                    }
                    return undefined
                }).filter(val=>val!==undefined)
                if(newData1.length>0){
                    props.setDatas(newData1)
                    props.searchhandler(e.target.value,"description")
                    page_num_handler(newData1)
                    }
                else{
                    alert("No Match Found")
                }
            }
            //If description field is cleared and location field has some value
            else if(props.search.location!=="" && e.target.value===""){
                var loc_val=document.getElementById("loc").value;
                var newData2=props.realData.map(val=>{
                    var pattern=new RegExp(loc_val,"i")
                    if(val.location.search(pattern)>=0){
                        return val
                    }
                    return undefined
                }).filter(val=>val!==undefined)
                if(newData2.length>0){
                    props.setDatas(newData2)
                    props.searchhandler(e.target.value,"description")
                    page_num_handler(newData2)
                }
                else{
                    alert("No Match Found")
                }
            }
        }
        else if(type==="location"){
            //Only Location field is entered
            if(props.search.description==="" && e.target.value!==""){
                var newLocData=props.realData.map(val=>{
                    var patt=new RegExp(e.target.value,"i")
                    if(val.location.search(patt)>=0){
                        return val
                    }
                    return undefined
                }).filter(val=>val!==undefined)
                if(newLocData.length>0){
                    props.setDatas(newLocData)
                    props.searchhandler(e.target.value,"location")
                    page_num_handler(newLocData)
                }
                else{
                    alert("No Match Found")
                }
            }
            //If both field are cleared
            else if(props.search.description==="" && e.target.value===""){
                props.setDatas(props.realData)
                props.searchhandler(e.target.value,"description")
                page_num_handler(props.realData)
            }
            //If both field hold values
            else if(props.search.description!=="" && e.target.value!==""){
                    console.log(props.datas)
                    var newLocData1=props.datas.map(val=>{
                        var patt=new RegExp(e.target.value,"i")
                        console.log(val.location.search(patt))
                        if(val.location.search(patt)>=0){
                            return val
                        }
                        return undefined
                    }).filter(val=>val!==undefined)
                    if(newLocData1.length>0){
                        props.setDatas(newLocData1)
                        props.searchhandler(e.target.value,"location")
                        page_num_handler(newLocData1)
                    }
                    else{
                        alert("No Match Found")
                    }
                }
            //If location field is cleared and description hold some value
            else if(props.search.description!=="" && e.target.value===""){
                var des_val=document.getElementById("des").value;
                console.log(des_val)
                var newLocData2=props.realData.map(val=>{
                    var pattern=new RegExp(des_val,"i")
                    if(val.title.search(pattern)>=0){
                        return val
                    }
                    return undefined
                }).filter(val=>val!==undefined)
                if(newLocData2.length>0){
                    props.setDatas(newLocData2)
                    props.searchhandler(e.target.value,"location")
                    page_num_handler(newLocData2)
                }
                else{
                    alert("No Match Found")
                }
            }
            }
    }
    return(
        <div className="form">
        <div>
        <div className="describe">Description</div>
        <input type="text" id="des" onChange={(e)=>changeHandler(e,"description")}></input>
        </div>
        <div>
        <div className="describe">Location</div>
        <input type="text" id="loc" onChange={(e)=>changeHandler(e,"location")}></input>
        </div>
        </div>
    )
}