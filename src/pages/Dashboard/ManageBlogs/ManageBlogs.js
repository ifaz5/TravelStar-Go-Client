import React, {useState, useEffect} from 'react';
import ManageBlog from '../ManageBlog/ManageBlog';
import './ManageBlogs.css'
const ManageBlogs = () => {
    const [services, setServices] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetch('https://pacific-oasis-98239.herokuapp.com/services')
        .then(res => res.json())
        .then(data => setServices(data.result))
    },[])

    const handleDeleteService = id => {
        console.log(id)
        const proceed = window.confirm('Are you sure, you want to delete?')
        if (proceed) {
            const url = `https://pacific-oasis-98239.herokuapp.com/services/${id}`;
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
    const handleConfirm = (id) => {
        const confirmation = window.confirm('Are you sure you want to Confirm!');
        if (confirmation) {
            fetch(`https://pacific-oasis-98239.herokuapp.com/confirmation/${id}`, {
                method: 'PUT',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount) {
                        alert('delete successfully')
                        setReload(!reload)
                    }
                    else {
                        window.confirm('Already Confirmed!');
                    }
                })
        }
    };

    return (
        <div class="row">
        <div class="col-sm-4 col-md-2 border-1">Blog Name</div>
        <div class="col-sm-4 col-md-2 border-1">Expense</div>
        <div class="col-sm-4 col-md-3 border-1">Blogger</div>
        <div class="col-sm-4 col-md-2 border-1">Status</div>
        <div class="col-sm-4 col-md-1 border-1">Delete</div>
        <div class="col-sm-4 col-md-2 border-1">Action</div>
        {
                                services.map(service => <ManageBlog key={service._id} service={service} handleDeleteService={handleDeleteService} handleUpdateStatus={handleConfirm}/>
                                    )
                            }
</div>
        
    )
};

export default ManageBlogs;