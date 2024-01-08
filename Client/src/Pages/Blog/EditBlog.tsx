import React, { useState } from "react";
import ReactQuill from "react-quill";
import DefaultInput from "../../components/DefaultInput";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";

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
const [state, setState] = useState({
title:'',
errorMssg:'',
image:'',
summary:'',
    isSubmitting:false,
    submittingError:false,
    content:''
})
const {title,errorMssg,isSubmitting,submittingError,image,summary,content}=state
const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setState({
      ...state,
      [e.target.name?.trim()]: e.target.value,
      // submittingError: false,
    });
  };
  return (
    <div className=" ">
      <Navbar />
      <div className="max-w-screen my-10">
        <p className="text-center text-[30px] font-bold">Edit blog</p>
        <form className="p-[10px] md:px-[100px] lg:w-3/4 m-auto grid gap-[20px]">
          <DefaultInput label="Title" placeholder="Input your title" name='title' value={title} handleChange={handleChange} />
          <DefaultInput label="Summary" placeholder="Summary" name='summary' value={summary} handleChange={handleChange}/>
          <DefaultInput label="Image" type="file" placeholder="Image" name='image' value={image} handleChange={handleChange}/>
          <div className="w-[calc(100vw-20px)] md:w-[calc(100vw-200px)] lg:w-full h-[250px]">
            <ReactQuill theme="snow" modules={modules} formats={formats} className='h-[150px]' value={title} onChange={newValue=>setState((prevState)=>({
                ...prevState,
                content:newValue
            }))}/>
          </div>
          <Button title="Edit post" />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditBlog;
