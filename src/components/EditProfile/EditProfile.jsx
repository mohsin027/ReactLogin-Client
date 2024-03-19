import axios from '../../axios';
import React, { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import './EditProfile.css'

function EditProfile() {
    const dispatch =useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>{
        return state.user
    })
    const [name, setname] = useState(user.details.name);
    const [file, setfile] = useState('')
    const [err, setErr] = useState('')
    let id=user.details._id;
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post('/editProfile',{name,file,id},{headers: {
            'content-type': 'multipart/form-data'
        }}).then((response)=>{
            console.log(response.data);
            if(!response.data.err){
              dispatch({type:'refresh'});
             return navigate('/')
            }else{
              setErr(response.data.message)
            }
        })
    }
  return (
    <div>
       <div className='main' >
        <h5>{err}</h5>
       <form onSubmit={handleSubmit}  >
      <label>Enter your name:
        <input type="text" value={name} onChange={(e)=>setname(e.target.value)} />
      </label><br/>
      <label>Enter your name:
        <input type="file" onChange={(e)=>setfile(e.target.files[0])} accept='image/*' />
      </label>
      <button type='submit'>submit</button>
    </form>
    
       </div>
       
    </div>
  )
}

export default EditProfile
