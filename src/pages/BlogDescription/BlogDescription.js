import { Alert, Skeleton, Snackbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
const BlogDescription = () => {
        
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
    const { isLoading } = useAuth();
    return (
        <>
        {isLoading ? <Box pt={0.5}>
              <Skeleton variant="rect" width={210} height={118} />
              <br/>
              <Skeleton variant='h1'  width="100%" />
              <Skeleton width="100%" />
              <Skeleton variant="rect" width={70} height={25} />
            </Box> : 
        <div className="container mt-5 mb-5">
        <h4 className='text-2xl mb-2'>{service?.data.name}</h4>
        <p className='mb-2'>Blog written Date : {service?.date.slice(0,10)}</p>
        <p className='mb-2'>Blog written Time : {service?.time.slice(16,24)} (Bangladesh standard Time)</p>
        <p className='mb-2'>{service?.data.description}</p>
            <div className="d-flex justify-between items-center row row-cols-1 row-cols-lg-2">
                <div className="col-sm d-lg-flex">
                {
                                service?.data.photoUrl?
                                <div className='d-flex align-items-center justify-content-center gap-5'>
                                <img className="m-5 pl-2" style={{width:'300px',height:'200px'}} src={service?.data.photoUrl} alt="" />
                                </div>
                                    :  <></>
                            }
                    {
                                service?.data.photoUrl2?
                                <div className='d-flex align-items-center justify-content-center gap-5'>
                                <img className="m-5 pl-2" style={{width:'300px',height:'200px'}} src={service?.data.photoUrl2} alt="" />
                                </div>
                                    :  <></>
                            }
                    {
                                service?.data.photoUrl3?
                                <div className='d-flex align-items-center justify-content-center gap-5'>
                                <img className="m-5 pl-2" style={{width:'300px',height:'200px'}} src={service?.data.photoUrl3} alt="" />
                                </div>
                                    :  <></>
                            }
                </div>
                <div className='col-sm'>
                <div className="block container">
            <div className=" mx-auto mt-4 text-center">
                <h4 className="text-green-500 text-3xl">Share experience about this blog</h4>
                <h6>You will review using name : {user.displayName} and profile pic :-</h6>
                <h6>Review on: {service?.data.name}</h6>
                <div className='d-flex align-items-center justify-content-center'>
                <img className='radius' alt={user.displayName} src={user.photoURL || 'https://i.ibb.co/qgbdqZ3/male.png'}></img>
                </div>
                <form className="flex flex-col w-100" onSubmit={handleSubmit(onSubmit)}>
                    <input onBlur={handleOnBlur} className="border-2 border-gray-300 m-2 px-2 d-none" {...register("name", {required: true})} defaultValue={user.displayName} placeholder="Name"/>
                    <textarea onBlur={handleOnBlur} className="border-2 border-gray-300 m-2 p-2" {...register("description", {required: true})} placeholder="Description"/>
                    <input onBlur={handleOnBlur} defaultValue={user.photoURL || 'https://i.ibb.co/qgbdqZ3/male.png'} className="border-2 border-gray-300 m-2 px-2 d-none rounded-full" {...register("img", {required: true})} placeholder="Photo Url"/>
                    <input onBlur={handleOnBlur} defaultValue={service?.data.name} className="border-2 border-gray-300 m-2 px-2 rounded-full" {...register("reviewOn", {required: true})} placeholder="Topic"/>
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
                </div>
                <div>
                </div>
            </div>
        </div>}
        </>
    )
}

export default BlogDescription;