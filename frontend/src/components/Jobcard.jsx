import axios from "axios";
import React, { useRef, useState } from "react";

const Jobcard = ({role,experience,organization}) => {
const [resume,setResume]=useState(null)

  const inputRef=useRef(null)
  const handleInput=(e)=>{
    inputRef.current.click()
    
    
  }
  const handleFileChange=(e)=>{
      const file = e.target.files[0]
      setResume(file)
      console.log(file)
  }
  const handleFileSubmit= async(e)=>{
     if( resume){
      const response= await axios.patch('http://127.0.0.1:5000/job-post',resume)
       
     }
  }
  
  return (
    <div className=" hover:scale-105 transition-all duration-300 rounded-xl border w-[300px]  p-4 gap-3 text-slate-700 text-sm flex  flex-col">
      <div className="flex font-semibold text-xl  items-center">
        {" "}
        <div className="h-[50px] w-[50px] rounded-full flex overflow-hidden">
          {" "}
          <img
            className=" w-full h-full"
            src="/images/companeylogo.jpg"
            alt="image"
          />{" "}
        </div>
        <p className="ml-4">{role}</p>
      </div>

      <p>experience : {experience}</p>
      <p>companey : {organization}</p>
    
      <button onClick={handleInput} className="border py-2 hover:bg-slate-100">{ resume ?resume.name:"Select Resume"}</button>
      <button onClick={handleFileSubmit} className="border py-2 hover:bg-slate-100" >Apply</button>
      <input  onChange={handleFileChange} ref={inputRef} type="file" className="hidden "/>
    </div>
  );
};

export default Jobcard;
