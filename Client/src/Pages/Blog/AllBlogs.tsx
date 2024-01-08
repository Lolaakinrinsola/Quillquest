import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { apiCall } from '../../Utils/URLs/axios.index'
import dayjs from 'dayjs';

const AllBlogs = () => {
  const [state, setState] = useState({errorMssg:'',
  isSubmitting: false,
  submittingError: false,
data:[]
})
const [isLoading, setisLoading] = useState(false)
const {data}=state
  async function getAllBlog() {
    setisLoading(true)
    try {
      const res = await apiCall({
        name: "allBlogs",
        // data: {},
        action: (): any => {},
        successDetails: {
          title: "Successful",
          text: "Blog created successfully!",
          icon: "",
        },
      }).then(async (res: any) => {
        console.log(res,data,'the response')
        setState((prevState)=>({
          ...prevState,
          data:res.data.data
        }))
setisLoading(false)
        // setTimeout(() => {
        //   navigate("/blogs");
        // }, 3000);
      });
    } catch (error: any) {
      console.log(error, "the error");
      setState((prevState: any) => ({
        ...prevState,
        errorMssg: error.response?.data?.message || "Something went wrong",
        isSubmitting: false,
        submittingError: true,
      }));
    }
    
  }
useEffect(() => {
  getAllBlog()
}, [])

  return (
    <>
    <Navbar/>
    <div className="grid  md:px-[100px] px-[10px] my-10 overflow-hidden ">
    <p className="text-[30px] font-extrabold text-center my-5">All Blogs</p>
    <div className="flex flex-wrap gap-[20px] gap-y-5 justify-center">

      {!isLoading&&data.map((val:any)=>(
        <Card name={val.user?.name} date={dayjs(val?.contentChangedAtdayjs ).format('DD MMMM YYYY, hh:mm A')} summary={val.summary} id={val.id} />

      ))}
   {/* <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/> */}

    </div>
</div>
<Footer/>
    </>
  )
}

export default AllBlogs