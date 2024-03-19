import './App.css';
import Login from './components/Login/Login';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Signup from './components/Signup/Signup';
import UserHome from './components/UserHome/UserHome';
import axios from './axios';
// import axios from 'axios';

import { useEffect, useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import EditProfile from './components/EditProfile/EditProfile';


import UserGAuthCallback from './components/UserGAuthCallback';

function App() {
  const [isLoading,setIslLoading]=useState(false)

 const {user,refresh}=useSelector((state)=>{
  return state
 });
 const dispatch =useDispatch();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    setIslLoading(true)
     axios.get('/checkAuth').then((response)=>{
      console.log(response);
      dispatch({type:'user',payload:{login: response.data.logged,details:response.data.details}});
      setIslLoading(false)
     })   
  }, [refresh])
  return (
    <div className="App">{
      isLoading &&
      <div className="d-flex justify-content-center align-items-center ">
        <div class="spinner-border" role="status">
        </div>
      </div>
      }
      {
        isLoading===false &&
      
      <Router>
        {
          user.login===false &&
        <Routes>
        <Route  element={<Login/>} path='/login'/>  
        <Route  element={<Signup/>} path='/signup'/>  
        <Route  element={<Navigate to={'/login'} />} path='/'/>  
        <Route  element={<Navigate to={'/login'} />} path='/editProfile'/> 
        <Route path='/auth/callback' element={<UserGAuthCallback/>}/>
        <Route path='/auth/verify' element={<h1>verify</h1>}/>

        </Routes>
        }
        {
          user.login===true &&
          <Routes>
        <Route  element={<Navigate to={'/'}/>} path='/login'/>  
        <Route  element={<Navigate to={'/'}/>} path='/signup'/>  
        <Route  element={<UserHome/>} path='/'/>  
        <Route  element={<EditProfile />} path='/editProfile'/> 
        <Route path='/auth/verify' element={<h1>verify</h1>}/>
        </Routes>
        }
       
      </Router>
        }
    </div>
  );
}

export default App;