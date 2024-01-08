import React from 'react'

const Card = ({name, date, title, summary,id}:any) => {
  return (
    <div className=" overflow-hidden rounded-lg w-[300px] h-[400px] border-dark-brown justify-normal shadow-lg">
    <img src="https://media.istockphoto.com/id/1433126431/photo/silhouette-of-climbers-who-climbed-to-the-top-of-the-mountain-thanks-to-mutual-assistance-and.webp?b=1&s=170667a&w=0&k=20&c=VWsOmADt5CxfVwvTBIG3hm8T1s4-NqX76UEUuO1hCaI=" alt="" className="rounded-lg"/>
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