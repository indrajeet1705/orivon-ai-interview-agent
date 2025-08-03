import React, { useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";

const Form = () => {
  const fileInputRef= useRef(null)
  const [selectedFile,setSelectedFile] = useState(null)
  const [formData,setFormData] =useState({
    orgName:'',
    yourName:'',
    role:'',
    requirements:'',
    jobDescription:'',
    aboutOrg:''

  })
   
 const FileSelectClick=()=>{
     fileInputRef.current.click()
 }
const handleFileSelect=(e)=>{
  const file = e.target.files[0]
  console.log(file)
  setSelectedFile(file)

}
const handleFormSubmit=(e)=>{
  e.preventDefault()
     console.log(formData)
     setFormData({
       orgName:'',
    yourName:'',
    role:'',
    requirements:'',
    jobDescription:'',
    aboutOrg:''
     })
    setSelectedFile('')
}
  
  return (
    <form  onSubmit={handleFormSubmit} className=" border rounded-xl bg-white  w-[70vw]   justify-between md:gap-8 flex p-5 md:p-10">
    
      <div className="  p-4 w-full text-lg text-slate-700 font-semibold gap-2 flex flex-col">
        <p>Organization name</p>
        <input
          type="text"
          value={formData.orgName}
          onChange={(e)=>setFormData(data=>({...data,orgName:e.target.value}))}
          placeholder="Enter Organization name"
          className="roundex-xl pl-4 w-full text-sm font-normal py-2 flex  outline-none border border-slate-200"
        />
        <p>Your name</p>
        <input
          type="text"
           value={formData.yourName}
          onChange={(e)=>setFormData(data=>({...data,yourName:e.target.value}))}
          placeholder="Enter your name"
          className="roundex-xl pl-4 w-full text-sm font-normal py-2 flex  outline-none border border-slate-200"
        />
        <p>Job Role</p>
        <input
          type="text"
           value={formData.role}
          onChange={(e)=>setFormData(data=>({...data,role:e.target.value}))}
          placeholder="Enter job role"
          className="roundex-xl pl-4 w-full text-sm font-normal py-2 flex  outline-none border border-slate-200"
        />
        <p>Requirements</p>
        <input
          type="text"
           value={formData.requirements}
          onChange={(e)=>setFormData(data=>({...data,requirements:e.target.value}))}
          placeholder="Enter requirements"
          className="roundex-xl pl-4 w-full text-sm font-normal py-2 flex  outline-none border border-slate-200"
        />
        <p>Resume</p>
        <div onClick={FileSelectClick}  className=" w-full border-slate-600 rounded-xl border-dashed border gap-1 h-24 hover:bg-slate-100 flex flex-col items-center justify-center ">
          <LuUpload size={25}/>
          <samp className=" text-sm text-slate-600 font-normal">upload</samp>
          {selectedFile &&
            <span className=" text-sm text-slate-600 font-normal">{selectedFile.name}</span>}
        </div>
        <input ref={fileInputRef} onChange={handleFileSelect} type="file" className=" hidden" />
        <button type="submit" className=" my-auto bg-blue-700 text-white rounded-xl py-3 hover:bg-blue-800 ">Submit</button>
      </div>
      <div  className="   p-4 w-full text-lg text-slate-700 font-semibold gap-6 flex flex-col">
        <p>Job description</p>
        <textarea value={formData.jobDescription}
        placeholder="Enter Job description"
        onChange={(e)=>setFormData(data=>({...data,jobDescription:e.target.value}))}
        className=" text-sm font-normal p-4 w-full border-r-slate-400 border rounded-xl" rows={8}></textarea>
        <p>About Organization</p>
        <textarea
        value={formData.aboutOrg}
        placeholder="Enter about organization"
        onChange={(e)=>setFormData(data=>({...data,aboutOrg:e.target.value}))}
        className="  text-sm font-normal p-4 w-full border-r-slate-400 border rounded-xl" rows={8}></textarea>
      </div>
    </form>
  );
};

export default Form;
