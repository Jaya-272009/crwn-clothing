import React,{useState} from "react"
import FormInput from "../form-input/form-input.component"
import CustomButton from "../custom-button/custom-button.component"
import {connect} from 'react-redux'
import "./sign-up.styles.scss"
import { signUpStart } from "../../redux/user/user.actions"

const SignUp = ({signUpStart}) => {
    
    const [userCredentials,setUserCredentials] = useState({

        displayName:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const {displayName,email,password,confirmPassword}=userCredentials;

    const handleSubmit = async event =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("password don't match");
            return;
        }

        signUpStart({displayName,email,password})
    };

    const handleChange = event =>{
        const {name,value}= event.target;
        setUserCredentials({...userCredentials,[name]:value})
    }

        return(
            <div className="sign-up">
                <h2 className="title">I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <FormInput type="text" name="displayName" value={displayName} handleChange={handleChange} label='Display Name' required />
                    <FormInput type="email" name="email" value={email} handleChange={handleChange} label='Email' required />
                    <FormInput type="password" name="password" value={password} handleChange={handleChange} label='Password' required />
                    <FormInput type="password" name="confirmPassword" value={confirmPassword} handleChange={handleChange} label='Confirm Password' required />
                    <CustomButton type='submit'> Sign Up</CustomButton>
                </form>
            </div>
        )
    }

const mapDispatchToProps = dispatch =>({
    signUpStart: userCredentions => dispatch(signUpStart(userCredentions))
})


export default connect(null,mapDispatchToProps)(SignUp)