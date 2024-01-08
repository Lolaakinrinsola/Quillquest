import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Storage } from '../Utils/Stores/inAppStorage'

const Navbar = () => {
    const navigate=useNavigate()
    const [dynamicNavbar, setdynamicNavbar] = useState(false)
    let userDetails: any = Storage?.getItem('userDetails') || '{}'
    let { token } = userDetails || { token: "" }
    let {photo} =userDetails || {photo:''}
    console.log(photo,'the photo')
    useEffect(() => {
      if (token!=='') setdynamicNavbar(true)
      else if(token===undefined) setdynamicNavbar(false)
      else setdynamicNavbar(false)
    }, [token])
  return (
    <div className='w-full h-[100px] bg-primary text-[#fffbff] flex justify-between px-[20px] md:px-[100px] py-[50px] items-center'>
<p className="text-[20px] uppercase hover:cursor-pointer" onClick={()=>navigate('/')}>QUILLQUEST</p>
<div className="flex gap-[20px] items-center">

{!dynamicNavbar?
<>
<p className="text-[16px] hover:cursor-pointer hover:text-light-brown hover:transition-all hover:duration-75 hover:ease-in-out" onClick={()=>navigate('/blogs')}>Blogs</p>
<p className="text-[16px] hover:cursor-pointer hover:text-light-brown hover:transition-all hover:duration-75 hover:ease-in-out" onClick={()=>navigate('/login')}>Login</p>
<p className="text-[16px] hover:cursor-pointer hover:text-light-brown hover:transition-all hover:duration-75 hover:ease-in-out" onClick={()=>navigate('/signup')}>Register</p>
</>:<>
<p className="text-[16px] hover:cursor-pointer hover:text-light-brown hover:transition-all hover:duration-75 hover:ease-in-out" onClick={()=>navigate('/blogs')}>My Blogs</p>
<p className="text-[16px] hover:cursor-pointer hover:text-light-brown hover:transition-all hover:duration-75 hover:ease-in-out" onClick={()=>navigate('/create')}>Create Blog</p>
<div className="flex items-center ">
  <img src={photo} alt="" />
<p className="text-[16px] hover:cursor-pointer hover:text-light-brown hover:transition-all hover:duration-75 hover:ease-in-out" onClick={()=>{navigate('/login');localStorage?.clear();}}>Log out</p>
</div>
</>}

</div>
    </div>
  )
}

export default Navbar