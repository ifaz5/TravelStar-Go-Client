import React from 'react';
// import './HomeService.css'
const AllUser = ({service}) => {
    const { email , displayName ,userPhoto, role } = service;
    return (
        <section className='mt-3'>
            <div style={{backgroundImage: `url("https://media.istockphoto.com/photos/white-abstract-marble-texture-silver-grey-light-background-wave-swirl-picture-id1277592603?b=1&k=20&m=1277592603&s=170667a&w=0&h=4-uL8pdN5DRnmaKKGzCX8QQ4BTFvnTQUhsQWJuYHgBk=")`}} className='col card border-0'>
                <div className='justify-content-center d-flex align-items-center py-2'>
                {userPhoto==="POST"?<img  style={{height:'70px',width:'70px',borderRadius:'50%'}} alt={displayName} src="https://i.ibb.co/qgbdqZ3/male.png"></img>:
                <img  style={{height:'70px',width:'70px',borderRadius:'50%'}} alt={displayName} src={userPhoto}></img>}
                {role==="admin"?<h4 className='text-center text-green-700'><i className="fal fa-user-cog pt-5"></i></h4>:
                <></>}
                </div>
                <h5 className='text-center'>{displayName}</h5>
                <p className='text-center'><small>{email}</small></p>


            </div>
        </section>
    );
};

export default AllUser;