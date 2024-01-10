import dayjs from "dayjs";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LoaderIcon, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Storage } from "../../Utils/Stores/inAppStorage";
import { apiCall } from "../../Utils/URLs/axios.index";

const Blog = () => {
  const [state, setState] = useState({
    errorMssg: "",
    isSubmitting: false,
    submittingError: false,
    data: "",
    content: <></>,
    contentChangedAt: "",
    id: 0,
    photo: "",
    summary: "",
    title: "",
    userId: 0,
    name: "",
    email: "",
  });
  const { id } = useParams();
  const {
    data,
    errorMssg,
    isSubmitting,
    userId,
    name,
    email,
    content,
    contentChangedAt,
    photo,
    summary,
    title,
  } = state;
  const [isLoading, setisLoading] = useState(false);
  let userDetails: any = Storage?.getItem("userDetails") || "{}";
  console.log(userDetails, "the user details");

  const { id:loggedInUser } = userDetails;
  const navigate=useNavigate()
  // console.log(id,'the id')

  // const refs: any = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const refs: any = useRef();
  // // isInView states
  // const isInViewArray = refs.map((ref: any) => useInView(ref, { once: true }));
  const isInViewArray = useInView(refs, { once: true });
  const mainControlsArray = useAnimation();
  // // mainControls animations
  // const mainControlsArray = isInViewArray.map(() => useAnimation());
  // useEffect to manage animations
  useEffect(() => {
    // isInViewArray.forEach((isInView: any, index: any) => {
    if (isInViewArray) {
      mainControlsArray.start("visible");
    }
    // });
  }, [isInViewArray, mainControlsArray]);

  async function getBlogbyId() {
    setisLoading(true);

    try {
      const res = await apiCall({
        name: "getBlog",
        urlExtra: `/${id}`,
        action: (): any => ["skip"],
      }).then(async (res: any) => {
        const { data } = res.data;
        const { data: data1 } = data;
        setState((prevState) => ({
          ...prevState,
          data: data1,
        }));
        console.log(res, data, "the response");
        const {
          content,
          contentChangedAt,
          id,
          photo,
          summary,
          title,
          user,
        }: any = data;
        if (user !== undefined && data !== "") {
          const { id: userId, name, email }: any = user;

          setState((prevState) => ({
            ...prevState,
            userId,
            name,
            email,
          }));
        }
        const content1 = content.replace(/<\/?[^>]+(>|$)/g, "");

        setState((prevState) => ({
          ...prevState,
          content: content1,
          contentChangedAt,
          id,
          photo,
          summary,
          title,
        }));
        setisLoading(false);
      });
      console.log(res, "the final");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBlogbyId();
  }, [id]);

  async function deleteBlogHandler() {
    try {
      const res = await apiCall({
        name: "deleteBlog",
        urlExtra: `/${id}`,
        action: (): any => {},
        successDetails: {
          title: "Successful",
          text: "Blog Deleted successfully!",
          icon: "",
        }
      }).then(()=>{
        setTimeout(() => {
          navigate('/blogs')
        }, 3000);
      })
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <>
      <Navbar />

      {isLoading ? (
        <div className="py-20 m-auto w-full">
          <LoaderIcon className="p-5 m-auto" />
        </div>
      ) : (<>
      
      </>
      )}
        <div className="px-[20px] md:px-[5em]">
      <Toaster />
          
          <div className="mt-20 ">
            <p className="font-bold lg:font-extrabold text-[1.7em] md:text-[3em]">
              {title}
            </p>
          </div>

          <motion.div
            className="mt-20 grid gap-10 md:grid-cols-2"
            ref={refs}
            variants={{
              hidden: { opacity: 0, y: 75, scale: 1 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControlsArray}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="">
              <img src={`http://127.0.0.1:4000/${photo}`} alt=""  />
              <div className="pt-2">
                by {name}
                <p className="">
                  {" "}
                  {dayjs(contentChangedAt).format("DD MMMM YYYY, hh:mm A")}
                </p>
              </div>
            </div>
            <div className="min-h-screen">
              <div className="font-thin text-[1.2em] md:text-[1.5em] grid gap-[20px]">
                {content}
                {/* <p className="">
              I recently graduated from the school of design with TECH4DEV as a
              User Experience Designer.
            </p>
            <p>
              I strive for an opportunity to use creativity and tech innovation
              to design the future of those who need it. I believe that through
              design, tech is a medium with the power to aid people around the
              world. We share stories in order to learn about each other’s
              values and shape together happiness.
            </p>
            <p>
              I continuously combine my skills in design and use it to advocate
              for those who are underrepresented anywhere. I hope that one day I
              can assist others to live their dreams too.
            </p>
            <p>
              Growing up, I have always loved crafting lovely decorations for
              myself and people around me. Helping people is also what I love
              doing and seeing them happy gives me a sense of satisfaction. My
              love for design started out when I started learning coreldraw in
              my dad’s office using his computer, I knew there was something for
              me in this space. I am now seeking full-time opportunities in
              product design where I can continue to influence people’s lives by
              designing delightful experiences and using human centered design
              to solve problems.
            </p> */}
              </div>
            </div>
          </motion.div>

          {userId===loggedInUser&&<div className="grid md:flex gap-5 items-end pb-10">
          <Button title='Edit' onClick={()=>navigate(`/blogs/edit-blog/${id}`)}/>
          <Button title='Delete' className='!bg-red' onClick={deleteBlogHandler}/>
          </div>}
        </div>

      <Footer />
    </>
  );
};

export default Blog;
