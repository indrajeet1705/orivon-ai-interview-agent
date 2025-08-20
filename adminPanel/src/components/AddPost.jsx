import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
const AddPost = () => {
    const [organization,setOrganization]=useState('')
  const [role,setRole]=useState('')
  const[experience,setExperience]=useState('')
  const [jobDescription,setJobDescription]=useState('')
  const handleformsubmit= async(e)=>{
    e.preventDefault()
    const jobPost={
      organization,role,jobDescription,experience
    }
    console.log(jobPost)
    const response= await axios.post('http://127.0.0.1:5000/job-post',jobPost)
    if(response.data.success){
      toast.success(response.data.message)
       setOrganization('')
    setJobDescription('')
    setRole('')
    setExperience('')
    }
    

  }
  return (
     <>
    <div className='w-full flex items-center h-[100vh] '>
      <form onSubmit={handleformsubmit} className='mx-auto border rounded-lg flex flex-col p-10 md:w-[600px]  text-slate-900  gap-4 '>
       <h1 className=' flex text-5xl font-semibold  mx-auto mb-4 '>Create Job Post</h1>
          
          <div className='flex flex-col gap-2  '>
            <p className='text-lg '>Organization Name</p>
            <input value={organization} onChange={(e)=>setOrganization(e.target.value)} type="text"  className='w-full rounded-xl text-sm  p-2 pl-4 outline-none border' placeholder='enter organozation name'/>
          </div>
          <div className='flex flex-col gap-2  '>
            <p>Job Role</p>
            <input type="text" value={role} onChange={(e)=>setRole(e.target.value)} className='w-full rounded-xl text-sm  p-2 pl-4 outline-none border' placeholder='enter job role '/>
          </div>
          <div className='flex flex-col gap-2  '>
            <p>Job Description</p>
            <textarea value={jobDescription} onChange={e=>setJobDescription(e.target.value)} rows={8} className='w-full rounded-xl text-sm  p-2 pl-4 outline-none border' placeholder='put job description here'></textarea>
          </div>
          <div className='flex flex-col gap-2  '>
            <p>Experience</p>
            <input type="text" value={experience} onChange={e=>setExperience(e.target.value)} className='w-full rounded-xl text-sm  p-2 pl-4 outline-none border' placeholder='In years'/>
          </div>
          <input type="submit" className='mx-auto px-8 py-3 font-semibold rounded-xl hover:bg-black hover:text-white transition duration-300 bg-slate-200 border' />
        
      </form>
    </div>

    </>
  )
}

export default AddPost
