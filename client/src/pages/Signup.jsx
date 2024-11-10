import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//design
import {
    TextField, 
    Button,
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel,
    FormControl,
    FormHelperText
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import {register} from '../api/user';
const Signup = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);    
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => { 
        setPassword(e.target.value);
        if(passwordValidation.test(e.target.value)) {
            setIsPasswordValid(true);
        }else{
            setIsPasswordValid(false);
            setConfirmPassword('');
        }
    };
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const res = await register({username, email, password});
            console.log(res);
            if(res.error) {
                toast.error(res.error);
            } else {
                toast.success(res.message);
                
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    //validation
    const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //let isPasswordValid = passwordValidation.test(password);

    //const a =;
    return (
        <div className='container mt-5 mb-5 col-10 col-sm-8 col-md-6'>
            <div className='text-center mb-5 alert alert-primary'>   
                <label htmlFor='' className='h2'>Sign Up</label>
            </div>
            <div className='form-group'>
                <TextField 
                    size='small' 
                    variant='outlined' 
                    className='form-control'
                    label='Username'
                    value={username}
                    onChange={handleUserNameChange}
                />
            </div>
            <div className='form-group mt-3'>
                <TextField 
                    size='small' 
                    variant='outlined' 
                    className='form-control'
                    label='Email'
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <div className='form-group mt-3'>
                <FormControl size='small' variant="outlined" className='form-control'>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position='end'>
                            <IconButton edge="end" onClick={handleShowPassword}>
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                </FormControl>
            </div>
            <div className='form-group mt-3'>
                <TextField 
                    size='small' 
                    type='password'
                    variant='outlined' 
                    className='form-control'
                    label='Confirm Password'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    disabled={!isPasswordValid}
                />
                {password && confirmPassword && (
                    <FormHelperText className='ms-1 mt-1'>
                        {password !== confirmPassword ?  
                        <span className='text-danger'>
                            <CancelIcon 
                                className='mr-1'
                                fontSize='small'
                            />
                            Password does not matched
                        </span>
                        :
                        <span className='text-success'>
                            <CheckCircleIcon 
                                className='mr-1'
                                fontSize='small'
                            />
                            Password matched
                        </span>
                        }
                    </FormHelperText>
                )}
                {password && !confirmPassword && (
                    <FormHelperText className='ms-1 mt-1'>
                        {isPasswordValid ?  
                        <span className='text-success'>
                            <CheckCircleIcon 
                                className='mr-1'
                                fontSize='small'
                            />
                            Password is valid
                        </span>
                        :
                        <span className='text-danger'>
                             <CancelIcon 
                                className='mr-1'
                                fontSize='small'
                            />
                            Password is not valid
                        </span>
                        }
                    </FormHelperText>
                )}
                
            </div>
            <div className="text-center mt-4">
                <Button 
                variant='contained' 
                disabled={!email || !password}
                onClick={handleRegister}
                >Submit</Button>
            </div>
        </div>
    );
};

export default Signup;