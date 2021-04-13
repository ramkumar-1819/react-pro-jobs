import React, { Component,useState,useEffect } from 'react';
import axios from 'axios';
import Job from './Job';
import Page from './Page';
import Search from './Search';


var orginalData;//copy of datas got from api
var totalPages;
export default function Home(){
    //usestate for storing apidata
    const [data,setData]=useState([])
    //usestate for page
    const[page,setPage]=useState(1)
    //usestate for pagebuttons
    const[pages,setpageButton]=useState([])
    //usestate for search
    const[search,setSearch]=useState({description:"",location:""})
    
    //useEffect for getting data from api
    useEffect(()=>{
     axios.get("https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json")
     .then(res=>{
                 orginalData=res.data;
                 setData(res.data)
                 totalPages=Math.ceil(res.data.length/10);
                 if(totalPages>3){
                     setpageButton([1,2,3])
                 }
                 else{
                    var new_page=[]
                    for(var i=0;i<totalPages;i++){
                        new_page.push(i+1)
                    }
                    setpageButton(new_page)
                 }
                })
     .catch(err=>console.log(err))
    },[])
    const settotalPages=(val)=>{
      totalPages=val
    }
    //set the datas based on search values
    const setDatas=(val)=>{
        setData(val)
    }
    //set page number based on the pagenumber button
    const setPageno=(val)=>{
        setPage(val)
    }
    //hold the title and location of the search
    const searchhandler=(tar,val)=>{
        setSearch({...search,[val]:tar})
    }
   //per pages there are only 10 jobs visible to user
    var lastjobIndex=page*10;
    var firstjobIndex=lastjobIndex-10;
    var currentDatas=data.slice(firstjobIndex,lastjobIndex)
    console.log(pages.length)
    return(<>
           <h1>PRO JOBS</h1>
           {data.length>0 &&
           <>
           <Search datas={data} setDatas={setDatas} realData={orginalData} settotalPages={settotalPages} setPageno={setPageno} setpageButton={setpageButton} search={search} searchhandler={searchhandler}/>
           <Page  totalPages={totalPages} pgno={page} pages={pages} setpageButton={setpageButton} data={data} setPageno={setPageno}/>
           <Job  datas={currentDatas}/>
           </>
            }
           </>)
}