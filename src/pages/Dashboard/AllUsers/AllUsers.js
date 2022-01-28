import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AllUser from '../AllUser/AllUser'
import useFirebase from '../../../Hooks/useFirebase';

const Services = () => {
    const [services, setServices] = useState([]);
    const [reload, setReload] = useState([]);
                const {user} = useFirebase();
                console.log(user);
                useEffect(() => {
                    const url = `https://pacific-oasis-98239.herokuapp.com/users`;
                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            setServices(data);
                            setReload(!reload);
                        })
                });

    return (
        <Container>
            <h1 className='text-center text-3xl m-3'>All Users</h1>
            <div className="row row-cols-1 justify-content-center row-cols-md-3 row-cols-lg-4 g-3">
            {
                services.map(service => <AllUser service={service} key={service._id} />)
            }
        </div>
        </Container>
        
    );
};

export default Services;