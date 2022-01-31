import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../../Hooks/useAuth';
import {Alert} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import './UserExperience.css'
import { useParams } from 'react-router-dom';
const UserExperience = () => {
    
    const [open, setOpen] = React.useState(false);
    const [success,setSuccess] = useState(false);
     const {user} = useAuth();
     const [review, setReview] = useState({});
     const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newReview = {...review};
        newReview[field] = value;
        setReview(newReview);

    }
    const { register, handleSubmit, reset } = useForm();
    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      const [service, setService] = useState();
      const { id } = useParams({});
        useEffect(() => {
          const url = `https://travelstar-go.herokuapp.com/services/${id}`;
            fetch(url)
                .then(res => res.json())
                .then(data => setService(data))              
        })
    const onSubmit = review => {
        fetch('https://travelstar-go.herokuapp.com/reviews', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
        .then(res => res.json())
        .then(data => {
            if(data) {
              reset()
               setSuccess(true)
            }
        })
    };

    return (
        <div className="sm:flex block container">
            <div className=" mx-auto mt-4 text-center">
                <h4 className="text-green-500 text-3xl">Share experience about this blog</h4>
                <h6>You will review using name : {user.displayName} and profile pic :-</h6>
                <h6>Review on: {service?.data.name}</h6>
                <div className='d-flex align-items-center justify-content-center'>
                <img className='radius' alt={user.displayName} src={user.photoURL}></img>
                </div>
                <form className="flex flex-col w-100" onSubmit={handleSubmit(onSubmit)}>
                    <input onBlur={handleOnBlur} className="border-2 border-gray-300 m-2 px-2 d-none" {...register("name", {required: true})} defaultValue={user.displayName} placeholder="Name"/>
                    <textarea onBlur={handleOnBlur} className="border-2 border-gray-300 m-2 p-2" {...register("description", {required: true})} placeholder="Description"/>
                    {
                      user.photoURL === "POST" ?
                      <input onBlur={handleOnBlur} defaultValue={'https://i.ibb.co/qgbdqZ3/male.png'} className="border-2 border-gray-300 m-2 px-2 rounded-full" {...register("img")} placeholder="Photo Url"/>:
                      <input onBlur={handleOnBlur} defaultValue="" className="border-2 border-gray-300 m-2 px-2 rounded-full" {...register("img")} placeholder="Photo Url"/>
                    }
                    <div className='d-flex align-items-center justify-content-center'>
                    <input type='text' onBlur={handleOnBlur} className="border-2 istyle  border-gray-300 m-2 h-10 px-2 rounded-full" {...register("reviewOn", {required: true})} defaultValue={service?.data.name} placeholder="reviewOn"/>
                    </div>
                    <div className='d-flex align-items-center justify-content-center'>
                    <input onBlur={handleOnBlur} className="border-2 rstyle border-gray-300 h-10 m-2 px-2 rounded-full" type="number" {...register("ratings", {required: true})} defaultValue={5} max={5} placeholder="Ratings"/>
                    </div>                  
                    <div className='items-center justify-center flex'>
                        <button onClick={handleClick} className='button-review w-35 text-center' type="submit" value="Share Experience">ㅤShare <i class="fal fa-share-alt ico"></i></button>
                    </div>
                    
                </form>
                {success && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Review Added Succesfully!
        </Alert>
      </Snackbar>}
            </div>
        </div>
    );
};

export default UserExperience;