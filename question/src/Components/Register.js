import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import jwt_decode from 'jwt-decode'
// import { registerUser } from '../Config/Myservice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { Container, Button, Typography, TextField, Grid, Avatar, Paper } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Navbar from './Navbar';
const regForName = RegExp(/^[A-Za-z]{3,10}$/);
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
function Register() {
    const success = (data) => toast.success(data, { position: toast.POSITION.TOP_CENTER });
    const failure = (data) => toast.error(data, { position: toast.POSITION.TOP_CENTER });
    const paperStyle = { padding: 20, height: '100vh', width: 400, margin: "20px auto" }
    const avatarStyle = { backgroundColor: "blue" }
    const [data, setData] = useState({});
    const [flag, setFlag] = useState(false);
    const [select, setSelect] = useState()
    const pass = useRef()
    const navigate = useNavigate();
    const [Values, setValues] = useState({
        password: '',
        confpassword:'',
        showConfPassword:false,
        showPassword: false,
    });
    const [Errors, setErrors] = useState({
        fname:'',
        lname:'',
        email:'',
        password: '',
        confpassword:'',
        showConfPassword:false,
        showPassword: false,
    });
    useEffect(()=>{
        if(localStorage.getItem("_token")){
            let token = localStorage.getItem("_token");
            let decode=jwt_decode(token);
        }
    },[])
    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'fname':
                Errors.fname = regForName.test(value) ? '' : 'Enter First Name Correctly';
                break;
            case 'lname':
                Errors.fname = regForName.test(value) ? '' : 'Enter Last Name Correctly';
                break;
            case 'email':
                Errors.email = regForEmail.test(value) ? '' : 'Enter Email Correctly';
                break;
            case 'password':
                Errors.password = regForPass.test(value) ? '' : 'Password must be between 6 to 16 characters and must contain one number and one special character';
                break;
            case 'confpassword':
                Errors.confpassword = pass.current.value !== value ? 'Password And Confirm Password Should Match' : '';
                break;
        }
        setSelect({ Errors, [name]: value }, () => {
        })
        //For Setting Data
        setData({ ...data, [name]: value })
    }
    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach((val) =>
            val.length > 0 && (valid = false));
        return valid;
    }
    const register = (e) => {
        e.preventDefault();
        setFlag(true)
        // if (validate(Errors)) {
        //     registerUser(data)
        //         .then((res, err) => {
        //             if (res.data.err) {
        //                 failure(res.data.err)
        //             }
        //             else {
        //                 success("Registered Successfully")
        //                 navigate("/login")
        //             }
        //         });
        // }
    }
    const handleChange = (prop) => (event) => {
        setValues({ ...Values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...Values,
            showPassword: !Values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowConfPassword = () => {
        setValues({
            ...Values,
            showConfPassword: !Values.showConfPassword,
        });
    };
    const handleMouseDownConfPassword = (event) => {
        event.preventDefault();
    };
    return <div>
        <Navbar/>
        <Container>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align="center">
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign Up</h2>
                    </Grid>
                    <Form onSubmit={register}>
                        <Form.Group className="mb-3"  >
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" type="text" fullWidth label="First Name" name='fname' onChange={handler} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }} />
                            {Errors.fname.length > 0 && <span style={{ color: "red" }}>{Errors.fname}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" type="text" fullWidth label="Last Name" name='lname' onChange={handler} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="end">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }} />
                            {Errors.lname.length > 0 && <span style={{ color: "red" }}>{Errors.lname}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" type="text" fullWidth label="Email Id" name='email' onChange={handler} InputProps={{
                                startAdornment: (
                                    <InputAdornment position="end">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }} />
                            {Errors.email.length > 0 && <span style={{ color: "red" }}>{Errors.email}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" type={Values.showPassword ? 'text' : 'password'} value={Values.password}
                                onChange={handleChange('password')} fullWidth label="Password" name='password' onChange={handler} InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="start"
                                            >
                                                {Values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {Errors.password.length > 0 && <span style={{ color: "red" }}>{Errors.password}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <TextField id="outlined-basic" label="Outlined" variant="outlined" type={Values.showConfPassword ? 'text' : 'password'} value={Values.confpassword}
                                fullWidth label="Confirm Password" name='confpassword' onChange={handler} InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfPassword}
                                                onMouseDown={handleMouseDownConfPassword}
                                                edge="start"
                                            >
                                                {Values.showConfPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {Errors.confpassword.length > 0 && <span style={{ color: "red" }}>{Errors.confpassword}</span>}
                        </Form.Group>
                    <Button variant="contained" type="submit" value="submit" id="submit" fullWidth  className='btn'  sx={{
                    color:'primary',
                    borderRadius:'20px'
                    }} >
                    <Typography variant="h6" component="div" >
                        Submit
                    </Typography>
                    </Button>
                    </Form>
                </Paper>
            </Grid>
        </Container>
    </div>;
}

export default Register;
