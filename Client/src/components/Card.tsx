import React from 'react'
import { useNavigate } from 'react-router-dom'

const Card = ({name, date, title, summary,id,photo}:any) => {
  const navigate= useNavigate()
  return (
    <div className=" overflow-hidden rounded-lg w-[300px] h-[400px] border-dark-brown justify-normal shadow-lg hover:cursor-pointer" onClick={()=>navigate(`${id}`)}>
    <img  src={`http://127.0.0.1:4000/${photo}`} alt="Blog cover image" className="rounded-lg"/>
    <div className="p-[10px] grid gap-2 h-fit overflow-hidden">
        <div className="grid items-center overflow-hidden">
        <p className="text-dark-brown text-[16px]">{name}</p>
<p className="text-[12px]"> {date}</p>
        </div>
        <p className="text-[22px]">{title}</p>
        <p className="text-[15px]">
          {summary} ...
        </p>
    </div>
</div>
  )
}

export default Card