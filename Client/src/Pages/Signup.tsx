import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import DefaultInput from '../components/DefaultInput'
import { ErrorCard } from '../Utils/ResponseHandler/error'
import { apiCall } from '../Utils/URLs/axios.index'

const Signup = () => {
    const navigate=useNavigate()
    const [state, setState] = useState({
    name:'',
      email:'',
      password:'',
      errorMssg:'',
      isSubmitting:false,
      submittingError:false,
      address:'',
      confirmPassword:''
    })
  const {email,password,errorMssg,isSubmitting,submittingError,name,address,confirmPassword}=state

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
  const handleSubmit=async(e: React.FormEvent)=>{
    setState((prevState: any) => ({
      ...prevState,
      errorMssg: "",
      isSubmitting: true,
      submittingError: false,
    }));
    if (password==='') {
      setState((prevState: any) => ({
        ...prevState,
        errorMssg: "Please input your password",
        isSubmitting: false,
        submittingError: true,
      }));
    }else if(password!==confirmPassword){
      setState((prevState: any) => ({
        ...prevState,
        errorMssg: "The passwords are not the same",
        isSubmitting: false,
        submittingError: true,
      }));
    } else {
      try {
        const res =await apiCall({
          name:'signUpUser',
          data:{
            email,
            password,
            name,
            address,
          },
          action:():any=>{},
          successDetails: {
            title: "Successful",
            text: "Signup successful!",
            icon: "",
          },
        }).then(async(res:any)=>{
          console.log(res,'the response from the api')
          const {token,data} =res;
          const {user}= data;
          const {id,name,email,address,photo}=user
          await localStorage.setItem('userDetails',JSON.stringify({
            token,id,name,email,address,photo
          }))
          setTimeout(() => {
            navigate('/blogs')
          }, 3000);
        })
        
      } catch (error:any) {
      console.log(error,'the error')
        setState((prevState: any) => ({
          ...prevState,
          errorMssg:  error.response?.data?.message || "Something went wrong",
          isSubmitting: false,
          submittingError: true,
        }));
      }
      
    }
   
  }
  return (
    <div className='grid md:grid-cols-2 h-screen items-center'>
      <Toaster/>
        <img src="https://media.istockphoto.com/id/1422876490/photo/happy-diverse-addicts-sitting-on-chairs-in-circle-talking.jpg?s=612x612&w=0&k=20&c=HVEzfFAqfy_30ZoEtTg5QupmdMGm7VRTo2-m4Y0mtSw=" alt="" className='hidden md:block object-fit w-full h-full ' />
        <div className="m-auto grid gap-[20px] text-black w-3/4">
<p className="font-bold text-[30px] text-primary">QUILLQUEST</p>
            <DefaultInput type="text" name="name" id="" placeHolder='Please input your full name' label='Full Name' value={name} handleChange={handleChange} />
            <DefaultInput type="email" name="email" id="" placeHolder='xyz@gmail.com' label='Email' value={email} handleChange={handleChange} />
            <DefaultInput name="address" id="" label='Address' placeHolder='Type your current address' value={address} handleChange={handleChange} />
            <DefaultInput type="password" name="password" id="" label='Password' value={password} handleChange={handleChange} />
            <div className="grid">
                
            <DefaultInput type="password" name="confirmPassword" id="" label='Confirm Password' value={confirmPassword} handleChange={handleChange} />
            <div className="flex justify-between items-center">
                <p className="text-[12px] text-dark-brown">Already Signed up? <span className='underline text-primary hover:cursor-pointer' onClick={()=> navigate('/login')}>Login</span> </p>
{/* <p className="font-bold text-[12px] text-black hover:cursor-pointer " onClick={()=> navigate('/signup')}>Signup here!</p> */}
            </div>
            </div>
            <ErrorCard
          handleClear={() => setState({ ...state, submittingError: false })}
          error={errorMssg}
          containerVariant={!submittingError ? "hidden" : ""}
        />
            <Button title='Sign Up' onClick={handleSubmit}/>
        </div>
    </div>
  )
}

export default Signup