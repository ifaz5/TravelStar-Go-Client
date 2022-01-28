import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import UserReviews from '../UserExperience/UserExperience'
const BlogDescription = () => {    
    const [service, setService] = useState();
    const { id } = useParams({});
      useEffect(() => {
        const url = `https://pacific-oasis-98239.herokuapp.com/services/${id}`;
          fetch(url)
              .then(res => res.json())
              .then(data => setService(data))              
      })
    return (
        <>
        <div className="container mt-5 mb-5">
        <h4>{service?.data.name}</h4>
        <p>Blog written Date : {service?.date.slice(0,10)}</p>
        <p>Blog written Time : {service?.time.slice(16,24)} (Bangladesh standard Time)</p>
        <p>{service?.data.description}</p>
            <div className="d-flex justify-between items-center row row-cols-1 row-cols-lg-2">
                <div className="col-sm d-lg-flex">
                {
                                service?.data.photoUrl?
                                <div className='d-flex align-items-center justify-content-center gap-5'>
                                <img className="m-5 pl-2" style={{width:'300px',height:'200px'}} src={service?.data.photoUrl2} alt="" />
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
        </div>
        </>
    )
}

export default BlogDescription;