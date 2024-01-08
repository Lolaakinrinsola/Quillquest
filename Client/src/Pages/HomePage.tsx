import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { animate, motion, useScroll } from "framer-motion"
import { useRef } from "react";
// React
import { inView } from "framer-motion"
import Card from "../components/Card";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

// Universal
const HomePage = () => {
  const navigate=useNavigate()
    const element:any=document.getElementById('box')
    inView(element, (info) => {
        const animation = animate(info.target, { opacity: 1 })
      
        // This will fire when the element leaves the viewport
        return (leaveInfo) => animation.stop()
      })
    const { scrollYProgress } = useScroll();
    const scrollRef = useRef(null)
  return (
    <div>
      <Navbar />
      
      <h1 className="text-center text-[40px] font-bold my-5 text-black ">
        EMPOWER YOUR ONLINE PRESENCE
      </h1>
      <div className="grid md:grid-cols-2 gap-[20px] md:px-[100px] md:mt-[40px] items-center text-[20px]" ref={scrollRef} style={{ overflow: "scroll" }} id='box'>
      {/* <motion.div initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ root: scrollRef }} /> */}
        <img
          src="https://media.istockphoto.com/id/1436951314/photo/business-woman-talking-to-her-colleagues-during-a-meeting-in-a-boardroom.jpg?s=612x612&w=0&k=20&c=D3IZJj-KqWmsPC6GNcTeno_qrBr6DGubIEMvBw98YBE="
          alt=""
          className="md:rounded-lg"
        />

        <div className="px-[10px] grid gap-[20px]">
          <p className=" ">
            In the digital age, a compelling online presence is crucial for
            businesses and individuals alike. At{" "}
            <span className="text-dark-brown font-bold">Quillquest</span> , we
            understand the significance of effective blog management in shaping
            your brand, engaging your audience, and driving success. In this
            blog, we'll explore the features and benefits of our blog management
            platform that allows you to seamlessly write, delete, upload, and
            engage through comments, transforming your online narrative.
          </p>
          <Button title='Craft your Narrative'/>
          
        </div>
      </div>
      <div className="bg-light-brown md:px-[100px] px-[10px] w-full min-h-[60px] mt-10 py-[100px] text-[20px]">
      <h1 className="text-center text-[40px]  font-bold my-5 text-black ">
        Amazing features of quillquest!
      </h1>
      <ul className="grid gap-[10px] text-center  text-black">
        <li>Create Engaging Content with Ease</li>
        <li>Effortless Deletion and Archiving</li>
        <li>Seamless Uploads for Rich Multimedia</li>
        <li>Interactive Commenting System</li>
        <li>User-Friendly Interface</li>
      </ul>
      </div>
      <div className="text-center grid my-10 text-black gap-[50px] text-[20px] m-auto md:w-1/2 px-[10px]">
        <p>Whether you're a solo blogger or managing a team of content creators, our platform empowers you to write, delete, upload, and interact with your audience seamlessly. Elevate your online presence with a blog management solution designed to meet the evolving needs of the digital landscape. Start your journey with us today!</p>
        <Button title='Sign Up!'/>

      </div>
<div className="grid md:px-[100px] px-[10px] my-10 overflow-hidden ">
  <div className="flex justify-between items-center">
  <p className="text-[30px] font-extrabold  my-5">Recent Blogs</p>
    <p className="text-[20px] underline my-5 hover:cursor-pointer " onClick={()=>navigate('/blogs')}>All blogs</p>

  </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[20px] justify-center">
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>

    </div>
</div>
      <Footer />
    </div>
  );
};

export default HomePage;
