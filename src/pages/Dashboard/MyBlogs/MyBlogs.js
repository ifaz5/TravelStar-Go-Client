import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HomeService from '../../Home/Home/HomeService/HomeService'
import useFirebase from '../../../Hooks/useFirebase';

const Services = () => {
    const [services, setServices] = useState([]);
    const [reload, setReload] = useState([]);
                const {user} = useFirebase();
                console.log(user);
                useEffect(() => {
                    const url = `http://localhost:5000/services?email=${user.email}`;
                    fetch(url)
                        .then(res => res.json())
                        .then(data => {
                            setServices(data.result);
                            setReload(!reload);
                        })
                });

    return (
        <Container>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {
                services.map(service => <HomeService service={service} key={service._id} />)
            }
        </div>
        </Container>
        
    );
};

export default Services;