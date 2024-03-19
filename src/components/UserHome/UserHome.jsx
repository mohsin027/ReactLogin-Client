import React from 'react'
import './UserHome.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../axios'
import { useDispatch ,useSelector } from 'react-redux';

function UserHome() {
  const imgURL='http://localhost:4000/upload_img/'
  axios.defaults.withCredentials = true;
const navigate =useNavigate();
const dispatch=useDispatch();
const user=useSelector((state)=>{
  return state.user;
 })
  const handleLogout=async()=>{
    console.log("hello");
    await axios.get('/logout').then((response)=>{
      dispatch({type:'refresh'})
      console.log(response);

     return navigate('/login')
    })
  }
  return (
    <div>
              <section className="login">
            <div className="login_box">
                <div className="left">
                    <div className="contact">
                    
                    <img src={`${user.details.image!==undefined ? imgURL+user.details.image.filename : 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=826&t=st=1680295524~exp=1680296124~hmac=02e23136e23578ef52071ce6ce8be6ecd2a32c6bef946fcacd4e6e788ed33360'}`} style={{objectFit:'cover'}} alt='' width="100"  className="rounded-circle" />
                    <h3>{user.details.name}</h3>
            
             <Link to={'/editProfile'} >Edit Profile Picture</Link>
                    <div className="top_link"> <Link onClick={handleLogout} ><button>Logout</button> </Link></div>
                    </div>
                </div>
                <div className="right">
            <h1>Welcome</h1>
                    <div className="right-text">
                    </div>
                </div>
            </div>
             
        </section>
    </div>
  )
}

export default UserHome
