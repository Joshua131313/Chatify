import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import {db} from '../Fire'
import firebase from 'firebase'
import Forgotpassword from './Forgotpassword'
import GoogleButton from 'react-google-button'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import ReactFacebookLogin from 'react-facebook-login'

function Login(props){
  const {loginwithYahoo,loginwithFacebook,loginwithGoogle,setlName,lname,name, setName, email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError } = props
  function determineLoading (){
      if(props.loading) {
       return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      }else {
        return 'Log in'
      }
  }
  return (
    <>
     <Route exact path='/'>
     <div className='login'>
    
        <div className="title">
        <i class="fal fa-comments"></i>
        <h1>{hasAccount?'Log In':'Register'}</h1>
        </div>
        <div className="spacer1"></div>
          <div className="logincontainer">
            <form onSubmit={(e)=>e.preventDefault()}>
              <label style={{display: hasAccount?'none': 'flex'}}>
                <span>Name</span>
                <input type="text" placeholder='John Doe' onChange={(e)=>setName(e.target.value)}/>
              </label>

              <label>
                <span>Email</span>
                <input type="text" value={email} placeholder='store@mail.com' onChange={(e)=>setEmail(e.target.value)}/>
                <p className='errormsgLogin'>{emailError}</p>
              </label>
              <label>
                <span>Password</span>
                <input type="password" placeholder='password' value={password}onChange={(e)=>setPassword(e.target.value)}/>
                <p className='errormsgLogin'>{passwordError}</p>
              </label>
              {hasAccount?
              <div className='btnContainer'>
                <button className='themeBtn' onClick={handleLogin}>{determineLoading()}</button>
             <div className='flex' style={{textAlign: 'center'}}>
             <Link exact to='/forgotpassword' className='forgotPasswordButton' >Forgot your password?</Link>
              <small>Don't have an account<span onClick={()=>setHasAccount(!hasAccount)} style={{cursor: 'pointer'}}>? Register</span></small>
             </div>
                
              </div>:
              
              <div className='btnContainer'>
                  <button className='themeBtn' style={{marginBottom: '10px'}} onClick={handleSignup}>Register</button>
                  <div className='flexrow'>
                  <small>Already have an account<span onClick={()=>setHasAccount(!hasAccount)} style={{cursor:'pointer'}}>? Sign in</span></small>
                  </div>
                  
              </div>}
              <div className='flexrow'>
              <button className='login-btn gog-btn' onClick={loginwithGoogle()}> <i class="fab fa-google"></i></button>
              <button className='login-btn fb-btn' onClick={loginwithFacebook()}><i className="fab fa-facebook"></i></button>
              <button className='login-btn yah-btn' onClick={loginwithYahoo()}><i class="fab fa-yahoo"></i></button>
              </div>
              
            </form> 
             
          </div>
        
      </div>
     </Route>
     <Route exact path='/forgotpassword'>
          <Forgotpassword />
     </Route>
     </>
  )
}
export default Login
