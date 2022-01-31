  import React from 'react';
  import './ManageBlog.css'
  const ManageBlog = ({service, handleDeleteService, handleUpdateStatus 
  }) => {
      const {name, price } = service.data;

      return (
        <>
        <div class="col-sm-4 col-md-3 mt-2">
          <p>Blog Name: {name}</p>
          </div>
        <div class="col-sm-4 col-md-2" >
          <p><small>Price: </small><small>$ {price}</small></p></div>
        <div class="col-sm-4 col-md-2"><p><small>Blogger: </small><small>{service?.bloggername}</small></p></div>
        <div class="col-sm-4 col-md-2">Status: {service?.status}</div>
        <div class="col-sm-4 col-md-1"><button onClick={() => handleDeleteService(service?._id)}><i className="fas fa-trash-alt text-red-500 text-lg"></i></button></div>
        <div className='col-sm-4 col-md-2'>
        {service?.status==="Approved"?<button disabled className='btn btn-success' onClick={(e)=>handleUpdateStatus(service?._id, e)}>Approve</button>:<button className='btn btn-success' onClick={(e)=>handleUpdateStatus(service?._id, e)}>Approve</button>}
        </div>
        </>
      )
  };

  export default ManageBlog;