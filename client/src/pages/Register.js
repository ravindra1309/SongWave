import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate}from'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import {toast} from'react-hot-toast';
function Register() {
    const navigate =useNavigate();
    const dispatch=useDispatch();
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:""
    });
    const register =async()=>
    {
        try {
            dispatch(ShowLoading());
            const response=await axios.post("/api/users/register",user);
            dispatch(HideLoading());
            if(response.data.success)
            {

                toast.success(response.data.message);
                navigate('/login');
            }else{
                toast.error(response.data.message);
                
            }
        } catch (error) {
            toast.error("Something went Wrong");
            dispatch(HideLoading());
            console.log(error.message);
        }
    }
  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div>
        <img src='https://img.pikbest.com/png-images/qianku/red-musical-note-pendant_2319211.png!bw700' alt=''></img>
        </div>
        <div className='flex flex-col gap-4 w-96 p-5 '>
            <h1 className='text-3xl font-bold text-secondary'>Welcome </h1>
            <input type='text' placeholder='Name'
            value={user.name}
            onChange={(e)=> setUser({...user, name:e.target.value})}
            />
            <input type='text' placeholder='Email'
            value={user.email}
            onChange={(e)=>setUser({...user, email:e.target.value})}
            />
            <input type='password' placeholder='Password'
            value={user.password}
            onChange={(e)=> setUser({...user, password:e.target.value})}
            />
            <button className='primary bg-primary'onClick={register}>Register</button>
            <Link to="/login" className='text-secondary underline'>Already Registered. Click Here to Login</Link>
        </div>

    </div>
  )
}

export default Register