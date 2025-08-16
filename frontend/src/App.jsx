import React, { useEffect, useState } from 'react';
import Jobcard from './components/Jobcard';
import axios from 'axios'

const App = () => {
  const [posts,setPosts]= useState(null)
  const getJobs= async()=>{
     const response= await axios.get('http://127.0.0.1:5000/job-post')
     setPosts(response.data) 
  }
  useEffect(()=>{
    getJobs()
  },[])
  
  return (
    <div className="w-full h-[100vh] flex  ">
      <div className=' md:w-[80vw] flex md:h-[80vh]  my-auto  flex-wrap md:mx-auto md:p-2 '>
         {
      posts && posts.map((post)=>{
        return (
           <div key={post._id} className='mt-8  ml-8'>
            <Jobcard role={post.role} organization={post.organization} experience={post.experience} jobDescription={post.jobDescription}/>
           </div>
          
        )
      })
     }
      </div>
    
    </div>
  );
};

export default App;
