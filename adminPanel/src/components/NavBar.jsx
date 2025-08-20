import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='w-full p-8 items-center border justify-center flex    '>
        <div className=' flex gap-14 font-semibold  text-lg text-slate-800'>
          <NavLink to={'/'} className={({isActive})=>isActive ? 'text-purple-500' :''}>Home</NavLink>
          <NavLink to={'/create-post'} className={({isActive})=>isActive ? 'text-purple-500' :''}>Add post</NavLink>
          </div>      
    </nav>
  )
}

export default NavBar
