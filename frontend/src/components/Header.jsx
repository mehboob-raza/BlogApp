import {AppBar, Toolbar, Typography, Box, Tabs, Tab,Button} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { logout } from '../store/AuthSlice'
import {useDispatch} from 'react-redux'


const Header = () => {
  const [value, setValue] = useState()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  // console.log(isLoggedIn,'isloggedin');
  const dispatch = useDispatch()
  return (
    <AppBar position='sticky' sx={{
      background: `linear-gradient(to right, #40c9ff, #ff1b6b, #e81cff)`
    }}>
      <Toolbar sx={{
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        
        <Typography variant='h4' sx={{
          fontWeight: 'bold',
        }}>BlogApp</Typography>

        <Box sx={{
          display: 'flex',
          marginLeft: 'auto',
          marginRight:'auto',
        }}>
          {isLoggedIn && <Tabs value={value} onChange={(e,val) => setValue(val)}>
            <Tab LinkComponent={Link} to='/blogs' label='All Blogs' sx={{
              color: '#fff',
              "&.Mui-selected": {
                color:'#000'
              }
            }} />
            <Tab LinkComponent={Link} to='/myBlogs' label='My Blogs' sx={{
              color: '#fff', 
            '&.Mui-selected': {
                color:'#000'
              }
            }} />

            <Tab LinkComponent={Link} to='/blogs/add' label='Add Blog' sx={{
              color: '#fff', 
            '&.Mui-selected': {
                color:'#000'
              }
            }} />
          </Tabs>}
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: "20px",
          marginLeft: 'auto'
        }}>
          {!isLoggedIn && <>
          <Button LinkComponent={Link} to='/auth' color='primary' variant='contained'  >
            Login
          </Button>
          <Button LinkComponent={Link} to='/auth' color='secondary' variant='contained'  >
            Signup
          </Button>
          </>
}
          {isLoggedIn && <Button LinkComponent={Link} to='/auth' color='secondary' variant='contained' onClick={()=> dispatch(logout())}>
            Logout
          </Button>}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
