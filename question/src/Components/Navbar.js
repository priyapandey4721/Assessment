import React from 'react'
import { Box } from '@mui/system'
import { AppBar, IconButton, Toolbar,Typography } from '@mui/material'
import {Link} from 'react-router-dom';
export const Navbar = (props) => {
    return (
       <>
          <Box sx={{flexGrow:1}}>
                   <AppBar position="static">
                       <Toolbar className='tools'>
                           <IconButton size="large" >
                            <h2><span className='dash' style={{color:'white'}}>NeoQuestion</span></h2>
                           </IconButton>
                           <Typography variant="h5" component="div" sx={{ flexGrow: 2 }}>
                           <Link to='/home' style={{textDecoration:'none',color:'white'}} >Sign Up</Link> &nbsp; &nbsp;&nbsp; &nbsp;
                             <Link to='/home' style={{textDecoration:'none',color:'white'}} >Login</Link> &nbsp; &nbsp;&nbsp; &nbsp;
                            </Typography>
                       </Toolbar>
                   </AppBar>
                </Box> 
        </>
    )
}
export default Navbar