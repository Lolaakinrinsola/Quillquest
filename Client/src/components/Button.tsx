
const Button = ({className,onClick,title,type}:any) => {
  return (
    <button className={`rounded-lg px-[20px] w-full py-[15px] bg-primary text-white hover:bg-dark-brown hover:text-black ${className}`} onClick={onClick} type={type}>
    {title}
  </button>
  )
}

export default Button