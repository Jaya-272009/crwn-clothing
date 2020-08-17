import React,{useState} from "react";
import {connect} from 'react-redux'
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { googleSignInStart,emailSignInStart } from "../../redux/user/user.actions";


const SignIn =(emailSignInStart,googleSignInStart)=> {
   
    const [userCredentials,setCredentials] = useState({
        email:'ani@gmail.com',
        password:'12341234'})

    const {email,password} = userCredentials;
    
  const  handleSubmit = async event =>{
        event.preventDefault();

        emailSignInStart(email,password);
    };

  const  handleChange= event=>{
        const { value,name} = event.target;
        setCredentials({...userCredentials,[name]:value})
    };


        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput name="email" type="email" value={email} handleChange={handleChange} label="email" required />
                    <FormInput name="password" type="password" value={password} label="password" handleChange={handleChange} required />
                    <div className="buttons">
                    <CustomButton type="submit"> Sign In </CustomButton>
                    <CustomButton type='button' isGoogleSignIn onClick={googleSignInStart}  > Sign In  with google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }

const matchDispatchToProps = dispatch => ({
    googleSignInStart:()=> dispatch(googleSignInStart()),
    emailSignInStart: (email,password) => dispatch(emailSignInStart({email,password}))
})

export default connect(null,matchDispatchToProps)(SignIn)
