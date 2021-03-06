import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'
import { db } from '../Fire'
import {ContextApp} from '../ContextAPI'
function Sidebar (props) {
  const {darkmode, chatcolor, widemode, themecolor}=useContext(ContextApp)

  const {updateProfile,chatFuncDisplay,handleLogout, setChatview, setChatstarted}=props
  const [userimg, setUserimg]=useState('')
  const [username, setUsername]=useState('')
  const [loader, setLoader]=useState(true)
  const user = firebase.auth().currentUser
  const [extend, setExtend]=useState(false)

  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const user = snap.data()  
      setUserimg(user.userinfo.cover)
      setUsername(user.userinfo.name)
      setLoader(false)
    })
  },[userimg])
  return (
   <>
  
    <div className="profilepic profilepiccol">
            {loader?<div className={loader?'loader':'loader'}><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>:
    <div>
      <img src={userimg} alt=""/>
       {widemode? <p className='widemodeElement'>{username}</p>:''}
    </div>
        }
        </div>
  
        <div className="icons">
            <NavLink activeClassName='activelink' exact to='/home'><span><i class="far fa-home"></i>{widemode?<p className='widemodeElement'>Home</p>:''}</span></NavLink>
            <NavLink activeClassName='activelink' onClick={()=>{chatFuncDisplay()}}  to='/chat'><span><i class="far fa-comment-alt"></i>{widemode?<p className='widemodeElement'>Chat</p>:''}</span></NavLink>
            <NavLink activeClassName='activelink'  to='/notifications'><span><i class="far fa-bell"></i>{widemode?<p className='widemodeElement'>Notifications</p>:''}</span></NavLink>
            <NavLink activeClassName='activelink' to='/podcast'><span><i class="fal fa-podcast"></i>{widemode?<p className='widemodeElement'>Podcast</p>:''}</span></NavLink>
            <NavLink activeClassName='activelink'  to='/settings'><span><i class="fal fa-cog"></i>{widemode?<p className='widemodeElement'>Settings</p>:''}</span></NavLink>
            <NavLink exact to='/' onClick={()=>{handleLogout()}}><span> <i  class="fal fa-sign-out-alt"></i>{widemode?<p className='widemodeElement'>Logout</p>:''}</span></NavLink> 
           <a onClick={()=>{updateProfile()}} className='widemodeElement' ><i class={widemode?"fal fa-chevron-double-right rotate":'fal fa-chevron-double-right'}></i></a>
        </div>    
       { widemode?'':<><div className='widemodeElement spac'></div>
        <div className='widemodeElement spac'></div></>}


  </>
  )
}
export default Sidebar