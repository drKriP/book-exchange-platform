import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../UserContext';
//design
import {
    TextField, 
    Button,
    InputAdornment,
    IconButton,
    OutlinedInput,
    InputLabel,
    FormControl
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import {login} from '../api/user';

const Login = () => {
    const navigate = useNavigate();
    const {setUser} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [labelShrink, setLabelShrink] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password});
            console.log(res);
            if(res.error) {
                toast.error(res.error);
            } else {
                toast.success(res.message);
                setUser(res.user);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        if (email) {
          setLabelShrink(true);
        }
        console.log("labelShrink :" +labelShrink)
      }, [email]);
    return (
        <div className='container mt-5 mb-5 col-10 col-sm-8 col-md-6'>
            <div className='text-center mb-5 alert alert-primary'>   
                <label htmlFor='' className='h2'>Login</label>
            </div>
            <div className='form-group'>
                <TextField 
                    size='small' 
                    variant='outlined' 
                    className='form-control'
                    label='Email'
                    value={email}
                    onChange={handleEmailChange}
                    InputLabelProps={{
                        shrink: labelShrink,
                      }}
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
            <div className="text-center mt-4">
                <Button 
                    variant='contained' 
                    disabled={!email || !password}
                    onClick={handleLogin}
                >Submit</Button>
            </div>
            {/* <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form> */}
        </div>
    );
};

export default Login;