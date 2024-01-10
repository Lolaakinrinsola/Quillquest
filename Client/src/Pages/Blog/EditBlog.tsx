import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import DefaultInput from "../../components/DefaultInput";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import { apiCall } from "../../Utils/URLs/axios.index";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const modules={
    toolbar:[
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link','image'],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ]
}

const formats=[
    'header',
    'bold','italic','underline','strike','blockquote','list','bullet','indent','link','image'
]
const EditBlog = () => {
  const { id } = useParams();
console.log(id)
const [isLoading, setisLoading] = useState(false)
const [state, setState] = useState({
  errorMssg: "",
  isSubmitting: false,
  submittingError: false,
  data: "",
  content: '',
  contentChangedAt: "",
  id: 0,
  photo: null as File | null,
  summary: "",
  title: "",
  userId: 0,
  name: "",
  email: "",
})
const {data,
  errorMssg,
  isSubmitting,
  userId,
  name,
  email,
  content,
  contentChangedAt,
  photo,
  summary,
  title,}=state
  const navigate=useNavigate()
// const handleChange = (
//     e:
//       | React.ChangeEvent<HTMLInputElement>
//       | React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setState({
//       ...state,
//       [e.target.name?.trim()]: e.target.value,
//       // submittingError: false,
//     });
//   };
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
          // photo,
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
  let formData = new FormData();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "photo") {
      const fileInput = e.target as HTMLInputElement;
      const files = fileInput.files;
      setState({
        ...state,
        photo: files?.[0] || null,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }

    // Append other fields
  };
  if (photo instanceof File && photo!==null) {
    // Convert File to Blob
    const photoBlob = photo.slice(0, photo.size, photo.type);

    // Create a new File with the Blob and the original file name
    const photoFile = new File([photoBlob], photo.name, { type: photo.type });

    // Append the File to the FormData
    formData.append("photo", photoFile);
  }
  formData.append("title", title);
  formData.append("summary", summary);
  if (id) {
    formData.append("user", id);
  }
  formData.append("content", content);
  formData.forEach((value, key) => {
    console.log("key %s: value %s", key, value);
  });
  const options = { content: formData };
  console.log(options,formData, "why isn the formdat showing");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prevState: any) => ({
      ...prevState,
      errorMssg: "",
      isSubmitting: true,
      submittingError: false,
    }));

    try {
      const res = await apiCall({
        name: "editBlog",
        urlExtra:`/${id}`,
        data: formData,
        action: (): any => {},
        successDetails: {
          title: "Successful",
          text: "Blog edited successfully!",
          icon: "",
        },
      }).then(async (res: any) => {
        setTimeout(() => {
          navigate(`/blogs/${id}`);
        }, 3000);
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
  };
  return (
    <div className=" ">
      <Navbar />
      <Toaster/>
      <div className="max-w-screen my-10">
        <p className="text-center text-[30px] font-bold">Edit blog</p>
        <form className="p-[10px] md:px-[100px] lg:w-3/4 m-auto grid gap-[20px]">
          <DefaultInput label="Title" placeholder="Input your title" name='title' value={title} handleChange={handleChange} />
          <DefaultInput label="Summary" placeholder="Summary" name='summary' value={summary} handleChange={handleChange}/>
          <DefaultInput label="Image" type="file" placeholder="Image" name='image' value={photo} handleChange={handleChange}/>
          <div className="w-[calc(100vw-20px)] md:w-[calc(100vw-200px)] lg:w-full h-[250px]">
            <ReactQuill theme="snow" modules={modules} formats={formats} className='h-[150px]' value={content} onChange={newValue=>
            setState((prevState)=>({
                ...prevState,
                content:newValue
            }))}/>
          </div>
          <Button title="Edit post" onClick={handleSubmit}/>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditBlog;
