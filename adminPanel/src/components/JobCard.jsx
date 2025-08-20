import React, { useRef, useState } from 'react'
import companeylogo from '/images/companeylogo.jpg'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

const JobCard = ({post_id,role,organization,experience,applications,getJobs}) => {
const handleDelete=async()=>{
  try {
    const response = await axios.delete(`http://127.0.0.1:5000/job-post?post_id=${post_id}`) 
    
    if(response.data.success){
      toast.success('Post deleted')
      getJobs()
    }
  } catch (error) {
    console.log(error.mesage)
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
    
      <button onClick={handleDelete} className="border py-2 rounded-xl hover:bg-red-500 flex items-center justify-center gap-3"><MdDelete size={23} /> </button>
      <div className="border rounded-xl py-2 hover:bg-slate-100 flex justify-center" >{applications || 0} applications</div>
     
    </div>
  )
}

export default JobCard
