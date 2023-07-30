import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { toast } from 'react-hot-toast';
function Login() {
  const dispatch= useDispatch();
  const navigate=useNavigate();
    const [user,setUser]=useState({
        email:"",
        password:""
    });
    const login =async()=>
    {
        try {
          dispatch(ShowLoading())
            const response=await axios.post("/api/users/login",user);
            dispatch(HideLoading())
            if(response.data.success)
            {
              toast.success(response.data.message);
              localStorage.setItem("token",response.data.data);
              navigate("/");
            }else{
              toast.error(response.data.message);
                alert(response.data.message)
            }
        } catch (error) {
          toast.error("Something went Wrong");
          dispatch(HideLoading())
            console.log(error.message);
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='flex flex-col gap-4 w-96 p-5'>
            <h1 className='text-3xl font-bold text-secondary'>Welcome Back</h1>
            <input type='text' placeholder='Email'
            value={user.email}
            onChange={(e)=>setUser({...user, email:e.target.value})}
            />
            <input type='password' placeholder='Password'
            value={user.password}
            onChange={(e)=> setUser({...user, password:e.target.value})}
            />
            <button className='primary bg-primary 'onClick={login}>Login</button>
            <Link to="/register" className='text-secondary underline'> Not Yet Registered? Click here to SignUp</Link>
        </div>
        <div className='h-[500px]'>
          <img src='https://img.pikbest.com/png-images/qianku/red-musical-note-pendant_2319211.png!bw700' alt=''></img>
        </div>
    </div>
  )
}

export default Login