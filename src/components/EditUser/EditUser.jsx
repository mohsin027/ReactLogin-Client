import axios from '../../axios'
import React, { useEffect, useState } from 'react'
import '../Signup/Signup.css'
import { useNavigate, useParams } from 'react-router-dom';




function EditUser() {
   
    const navigate=useNavigate();
    const {id} =useParams();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [file, setfile] = useState('')
    const [user, setUser] = useState(null)
    const [err, setErr] = useState('')
    
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(name.trim()&&email.trim()){

            axios.post('/admin/postEditUser'+id,{name,email,file},{headers: {
                'content-type': 'multipart/form-data'
            }}).then((response)=>{
                console.log(response.data);
                if(!response.data.err){
                   
                    return navigate('/admin/adminHome')
                }else{
                    setErr(response.data.message)
                }
            })
        }else{
            setErr('Empty fields are not allowed')
        }
    }
    useEffect(() => {
        axios.get('/admin/editUser'+id).then((response)=>{
          console.log(response.data.user);
          setUser(response.data.user)
          setName(response.data.user.name);
          setEmail(response.data.user.email);
        })
   }, [])
  return (
    <>
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
        <input type="file"  onChange={e=>setfile(e.target.files[0])}   />
      </fieldset>
      <button type="submit" className="btn">submit</button>
    </form>
  </div>
</div>
 
    </>
  )
}

export default EditUser
