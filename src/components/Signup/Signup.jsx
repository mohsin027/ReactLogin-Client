import React, { useState } from 'react'
import './Signup.css'
import axios from '../../axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

function Signup() {
  axios.defaults.withCredentials = true;
const navigate = useNavigate();
const dispatch=useDispatch();


const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [err, setErr] = useState(null)
const handleSubmit=(e)=>{
  e.preventDefault();
  if(name.trim()&& email.trim()&&password.trim()){
    axios.post('/signup',{name,email,password}).then((response)=>{
    if(!response.data.err){
      dispatch({type:'refresh'})
      console.log(response.data);
     return navigate('/')
    }else{
      setErr(response.data.message)
    }
    })
  }else{
    setErr("All fields are required")
  }
}
return (
    <div>
 <div className='Signup'>
  <div className='Signup-connect'>
  </div>
  <div className='Signup-classic'>
    <h5 className='err'>{err}</h5>
    <form className='Form' onSubmit={handleSubmit}>
      <fieldset className='Username'>
        <input type="text" placeholder="username" value={name} onChange={e=>setName(e.target.value)} required/>
      </fieldset>
      <fieldset className='Email'>
        <input type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
      </fieldset>
      <fieldset className='Password'>
        <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}  required/>
      </fieldset>
      <button type="submit" className="btn">sign up</button>
    </form>
    <Link to={'/login'} style={{textDecoration:'none'}}>Goto Login</Link>
  </div>
</div>
    </div>
  )
}

export default Signup
