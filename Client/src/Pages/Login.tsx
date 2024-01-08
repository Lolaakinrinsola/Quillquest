import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import DefaultInput from '../components/DefaultInput'
import { ErrorCard } from '../Utils/ResponseHandler/error'
import { apiCall } from '../Utils/URLs/axios.index'

const Login = () => {
  const [state, setState] = useState({
    email:'',
    password:'',
    errorMssg:'',
    isSubmitting:false,
    submittingError:false
  })
  const {email,password,errorMssg,isSubmitting,submittingError}=state
    const navigate=useNavigate()

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
      try {
        const res =await apiCall({
          name:'loginUser',
          data:{
            email,
            password
          },
          action:():any=>{},
          successDetails: {
            title: "Successful",
            text: "Login successful!",
            icon: "",
          },
        }).then(async(res:any)=>{
          console.log(res,'the response from the api')
          const {token,data} =res;
          const {user}= data;
          const {id,name,email,address,photo}=user
          console.log(user,'the user')
  
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
    console.log('the state',state)
  return (
    <div className='grid md:grid-cols-2 h-screen items-center'>
      <Toaster/>
        <img src="https://media.istockphoto.com/id/1448698612/photo/diversity-hands-and-team-above-in-support-trust-and-unity-for-collaboration-agreement-or.jpg?s=612x612&w=0&k=20&c=gGqdVAEvyopmhqELxQ1tgrqXZkCmHWi5nCleGGDuHJU=" alt="" className='hidden md:block object-cover h-full w-full ' />
        <div className="m-auto grid gap-[20px] text-black w-3/4">
<p className="font-bold text-[30px] text-primary">QUILLQUEST</p>
            <DefaultInput type="email" name="email" id="" placeholder='xyz@gmail.com' label='Email' value={email} handleChange={handleChange}/>
            <div className="grid">
            <DefaultInput type="password" name="password" id="" label='Password' value={password} handleChange={handleChange} />
            <div className="flex justify-between items-center">
                <p className="text-[12px] text-dark-brown">Can't remember password? <span className='underline text-primary hover:cursor-pointer' onClick={()=> navigate('/forgotPassword')}>Reset Password</span> </p>
<p className="font-bold text-[12px] text-black hover:cursor-pointer " onClick={()=> navigate('/signup')}>Signup here!</p>
            </div>
            <ErrorCard
          handleClear={() => setState({ ...state, submittingError: false })}
          error={errorMssg}
          containerVariant={!submittingError ? "hidden" : ""}
        />
            </div>
            <Button title='Login' onClick={handleSubmit}/>
        </div>
    </div>
  )
}

export default Login