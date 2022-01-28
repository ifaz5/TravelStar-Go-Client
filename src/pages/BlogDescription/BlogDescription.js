import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import UserReviews from '../UserExperience/UserExperience'
const BlogDescription = () => {    
    const [service, setService] = useState();
    const { id } = useParams({});
    const { isLoading } = useAuth();
      useEffect(() => {
        const url = `https://pacific-oasis-98239.herokuapp.com/services/${id}`;
          fetch(url)
              .then(res => res.json())
              .then(data => setService(data))
      })
    return (
        <>
        {isLoading ? <Box pt={0.5}>
              <Skeleton variant="rect" width={210} height={118} />
              <br/>
              <Skeleton variant='h1'  width="100%" />
              <Skeleton width="100%" />
              <Skeleton variant="rect" width={70} height={25} />
            </Box> : 
        <div className="container mt-5 ml-5 mb-5">
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
                <div className=''>
                    <UserReviews service={service} />
                </div>
                <div>
                </div>
            </div>
        </div>}
        </>
    )
}

export default BlogDescription;