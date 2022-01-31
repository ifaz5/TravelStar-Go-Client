import { Alert } from '@mui/material';
import React, {useState, useEffect} from 'react';
import ManageBlog from '../ManageBlog/ManageBlog';
import './ManageBlogs.css'
const ManageBlogs = () => {
    const [services, setServices] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetch('https://travelstar-go.herokuapp.com/services')
        .then(res => res.json())
        .then(data => setServices(data.result))
    },[])

    const handleDeleteService = id => {
        console.log(id)
        const proceed = window.confirm('Are you sure, you want to delete?')
        if (proceed) {
            const url = `https://travelstar-go.herokuapp.com/services/${id}`;
            fetch(url, {
                    method: 'DELETE',
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert('delete successfully')
                        const remainingServices = services.filter(service => service._id !==id);
                        setServices(remainingServices);
                    }
                })
        }
    }
    const handleConfirm = (id,e) => {
        e.preventDefault()
        const confirmation = window.confirm('Are you sure you want to Confirm!');
        if (confirmation) {
            fetch(`https://travelstar-go.herokuapp.com/confirmation/${id}`, {
                method: 'PUT',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount) {
                        <Alert severity="success">Approved</Alert>
                    setReload(!reload)
                    }
                    else {
                        <Alert severity="warning">Already Approved</Alert>
                    }
                })
        }
    };
    return (
        <div style={{marginTop:'-80px'}} class="row">
        {
                                services.map(service => <ManageBlog key={service._id} service={service} handleDeleteService={handleDeleteService} handleUpdateStatus={handleConfirm}/>
                                    )
                            }
</div>
        
    )
};

export default ManageBlogs;