  import React from 'react';
  import './ManageBlog.css'
  const ManageBlog = ({service, handleDeleteService, handleUpdateStatus 
  }) => {
      const {name, price } = service.data;

      return (
        <>
        <div class="col-sm-4 col-md-2" >{name}</div>
        <div class="col-sm-4 col-md-2" >$ {price}</div>
        <div class="col-sm-4 col-md-3" >{service?.admin}</div>
        <div class="col-sm-4 col-md-2" >{service?.status}</div>
        <div class="col-sm-4 col-md-1" ><button onClick={() => handleDeleteService(service?._id)}><i className="fas fa-trash-alt text-red-500 text-lg"></i></button></div>
        <div class="col-sm-4 col-md-2" >{service?.status==="Approved"?<button disabled className='btn btn-success' onClick={() => handleUpdateStatus(service?._id)}>Approve</button>:<button className='btn btn-success' onClick={() => handleUpdateStatus(service?._id)}>Approve</button>}</div>
        </>
      )
  };

  export default ManageBlog;