import React, { useState } from "react";
import ReactQuill from "react-quill";
import DefaultInput from "../../components/DefaultInput";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "react-quill/dist/quill.snow.css";
import Button from "../../components/Button";
import { apiCall } from "../../Utils/URLs/axios.index";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../Utils/Stores/inAppStorage";
import { Toaster } from "react-hot-toast";
import { ErrorCard } from "../../Utils/ResponseHandler/error";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const NewBlog = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    errorMssg: "",
    photo: null as File | null,
    summary: "",
    isSubmitting: false,
    submittingError: false,
    content: "",
  });
  const {
    name,
    errorMssg,
    isSubmitting,
    submittingError,
    photo,
    summary,
    content,
  } = state;
  let formData = new FormData();
  let userDetails: any = Storage?.getItem("userDetails") || "{}";
  console.log(userDetails, "the user details");

  const { id } = userDetails;
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
  if (photo instanceof File) {
    // Convert File to Blob
    const photoBlob = photo.slice(0, photo.size, photo.type);

    // Create a new File with the Blob and the original file name
    const photoFile = new File([photoBlob], photo.name, { type: photo.type });

    // Append the File to the FormData
    formData.append("photo", photoFile);
  }
  formData.append("title", `${name}`);
  formData.append("summary", summary);
  formData.append("user", id);
  formData.append("content", content);
  formData.forEach((value, key) => {
    console.log("key %s: value %s", key, value);
  });
  const options = { content: formData };
  console.log(options, "why isn the formdat showing");
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
        name: "createBlog",
        data: formData,
        action: (): any => {},
        successDetails: {
          title: "Successful",
          text: "Blog created successfully!",
          icon: "",
        },
      }).then(async (res: any) => {
        setTimeout(() => {
          navigate("/blogs");
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
    <div>
      <Navbar />
      <Toaster />
      <div className="max-w-screen my-10">
        <p className="text-center text-[30px] font-bold">Create a new blog</p>
        <div className="p-[10px] md:px-[100px] lg:w-3/4 m-auto grid gap-[20px]">
          <DefaultInput
            label="Title"
            placeholder="Input your title"
            name="name"
            value={name}
            handleChange={handleChange}
          />
          <DefaultInput
            label="Summary"
            placeholder="Summary"
            name="summary"
            value={summary}
            handleChange={handleChange}
          />
          <DefaultInput
            label="Image"
            type="file"
            placeholder="photo"
            name="photo"
            value={undefined}
            handleChange={handleChange}
          />
          <div className="w-[calc(100vw-20px)] md:w-[calc(100vw-200px)] lg:w-full h-[250px]">
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              className="h-[150px]"
              onChange={(newValue) =>
                setState((prevState) => ({
                  ...prevState,
                  content: newValue,
                }))
              }
            />
          </div>
          <ErrorCard
            handleClear={() => setState({ ...state, submittingError: false })}
            error={errorMssg}
            containerVariant={!submittingError ? "hidden" : ""}
          />
          <Button title="Create post" onClick={handleSubmit} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewBlog;
