import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import { Avatar,Grid,Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useNavigate } from 'react-router';
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import { Divider } from '@material-ui/core';
import Drawer from "@material-ui/core/Drawer";
import M from "@material-ui/icons/Add"
import { BorderColor, ExpandMore,ArrowLeft,ArrowRight, ArrowUpward, ArrowBackOutlined, LaptopMacTwoTone, AdbRounded } from '@material-ui/icons';
import { width } from 'dom-helpers';
import { TextField } from '@material-ui/core';
import { useDispatch,useSelector } from 'react-redux';
import { DeleteOutline } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    color:'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      color:'white',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    color:'white',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'white'
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color:'white',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
const [location,setLocation]=useState('')
const [matter,setMatter]=useState('')
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
var navigate=useNavigate()
var dispatch=useDispatch()






const Delete=(items)=>{


console.log(items)
dispatch({type:'REMOVE_ITEM',payload:[items]})
// props.navigation.setParams({x:""})
  setRefresh(!refresh)
navigate("/header")

}









const showFoodCart = () => {
  return values.map((items) => {
    return (
      <>
    

    <div style={{fontWeight:'bold',backgroundColor:'#dfe6e9'}}>
    


    <div
    style={{ 
      // display:'flex',
  backgroundColor:'white',



  // BorderColor:'black'
  
  border: '1px solid black'
,height:'98px'
}}

  >
      
{/* <hr color='black' width='100%' size='1'></hr> */}
      <div style={{backgroundColor:""}}>

  <Grid container spacing={1}>

<Grid xs={12} sm={3}
>

<div style={{fontSize:17,padding:15,marginLeft:50,color:'blue',textDecorationLine:'underline',marginLeft:10,display:'flex',flexDirection:'column'}}>{items.matter}
</div>

<b style={{marginLeft:20,marginBottom:13,padding:5}}>{items.description}</b>

</Grid>

 





  <Grid xs={12} sm={3}
>
<div 
 style={{display:'flex',
  backgroundColor:'white',

  // borderRadius:'px',
  
  // BorderColor:'black'
  // ,
  border: '1px solid red',
  width:442,height:'102px',marginLeft:0}}
  >
<div style={{fontSize:17,padding:15,marginTop:15,color:'blue',textDecorationLine:'underline'}}>{items.client}</div>
</div>
</Grid>



  <Grid xs={12} sm={3}
>









<div style={{fontSize:17,padding:15,fontWeight:450,marginLeft:40}}>{items.location}</div>
<b style={{marginLeft:55,fontWeight:'bold'}}>{items.match}</b>
</Grid>

<Grid xs={12} sm={3}>
<div style={{marginTop:25,padding:5,color:'white'}}>
          
          <Button variant="contained" color="primary"  onClick={toggleDrawer("right", true)}>
          <b style={{color:'white'}} >Edit</b>
</Button>
<Button style={{marginLeft:30,color:'white'}} variant="contained" color="secondary" onClick={(items)=>Delete(items)}>
  <b style={{color:'white'}}>Delete</b>
</Button>
          </div> 
</Grid>

{/* <div style={{marginTop:5,padding:5,color:'white'}}>
          
          <Button variant="contained" color="primary">
          <b style={{color:'white'}} >Edit</b>
</Button>
<Button style={{marginLeft:20,color:'white'}} variant="contained" color="secondary">
  <b style={{color:'white'}}>Delete</b>
</Button>
          </div> */}


  </Grid>
</div>
</div>
</div>

      </>
    );
  });
};










var cart = useSelector((state) => state.cart);
var keys = Object.keys(cart);
var values = Object.values(cart);

console.log("cart with keys",cart)



const [description,setDescription]=useState('')
const [client,setClient]=useState('')
const [match,setmatch]=useState('')



  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };











  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
const [refresh,setRefresh]=useState(false)
  const handleProceed = () => {
    var body={description:description,client:client,match:match,matter:matter,location:location}

    dispatch({type:'ADD_ITEM',payload:[body,body]})
      // props.navigation.setParams({x:""})
        setRefresh(!refresh)
navigate("/header")


  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <Paper
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: 1,
          marginBottom: 5,
        }}
      >
        Enter Details


      </Paper>
   
<div>
    <b>Matter</b>
    <TextField label="Enter Matter" variant='outlined'
    onChange={(event)=>setMatter(event.target.value)} fullWidth></TextField>
</div>

<div>
    <b>Description</b>
    <TextField label="Enter Description" variant='outlined'
    onChange={(event)=>setDescription(event.target.value)} fullWidth></TextField>
</div>

<div>
    <b>Associated Client</b>
    <TextField label="Enter associated client"
    onChange={(event)=>setClient(event.target.value)} variant='outlined' fullWidth></TextField>
</div>
<div>
    <b>Location</b>
    <TextField label="Enter location"
      onChange={(event)=>setLocation(event.target.value)} variant='outlined' fullWidth></TextField>
</div>
<div>
    <b>Match</b>
    <TextField label="Enter match"
      onChange={(event)=>setmatch(event.target.value)} variant='outlined' fullWidth></TextField>
</div>

<div style={{ padding: 3, marginTop: 10 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleProceed()}
          color="primary"

          style={{background:'#006266'}}
        >
         <b style={{color:'white'}}> Submit Details</b>
        </Button>
      </div>


      </div>
  
  );















  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} style={{marginTop:0,fontWeight:'bold',backgroundColor:'#dfe6e9'}}>
      <AppBar position="static">
        <Toolbar>
      
          <Typography className={classes.title} variant="h6" noWrap>
          <img style={{display:'flex',justifyContent:'center',alignItems:'center'}} src="/2.png" width='40'></img>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          
        <div style={{backgroundColor:'green',color:'white',height:40,width:180,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={toggleDrawer("right", true)}>Create New </div>
           
          </div>
          <div className={classes.sectionMobile}>
           
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}


     
















      <div style={{marginTop:0,fontWeight:'bold',backgroundColor:'#dfe6e9'}}>
    


      <div style={{ display:'flex',
    backgroundColor:'white',
  
  
 
    BorderColor:'black'
    ,marginTop:40,
    border: '1px solid black'}}
    >
        

        <div style={{backgroundColor:""}}>

<div style={{height:"40px",backgroundColor:""}}>

  <div style={{marginTop:15,marginLeft:10,fontSize:19}}>Matters</div>
  </div>
<div  style={{marginTop:0,fontWeight:'bold',backgroundColor:'#dfe6e9',display:'flex',
    backgroundColor:'white',
  
    // borderRadius:'px',
   
    // BorderColor:'black'
    
    border: '1px solid black',
    fontWeight:'bold',
    width:927,backgroundColor:'#dfe6e9',marginTop:0,height:34,flexDirection:'row'}}>

        <div style={{marginLeft:10,marginTop:6}}>Matter/Description</div>

        
        <div 
         style={{marginTop:0,display:'flex',
    backgroundColor:'#dfe6e9',
  
    borderRadius:'px',
  
 
    border: '1px solid red',
    width:442,height:'35px',marginLeft:74}}
    >
        <div style={{marginLeft:12,marginTop:6}}>Associated Client</div>
        <div style={{marginLeft:130,marginTop:6}}>Location / Match</div>
        </div>
    
        </div>
















{showFoodCart()}


{/* 

    <Grid container spacing={1}>

<Grid xs={12} sm={4}
>

<div style={{fontSize:17,padding:15,color:'blue',textDecorationLine:'underline'}}>00009-Smith
</div>
<b style={{marginLeft:15}}>Dissolution Of Marriage</b>


</Grid>

   





    <Grid xs={12} sm={4}
>
<div  style={{marginTop:0,fontWeight:'bold',display:'flex',
    backgroundColor:'white',
  
    borderRadius:'px',
    
    BorderColor:'black'
    ,borderWidth:5,
    border: '1px solid red',
    width:442,height:'93px'}}>
<div style={{fontSize:17,padding:15,marginTop:15,color:'blue',textDecorationLine:'underline'}}>Kevin Smith</div>
</div>
</Grid>

 

    <Grid xs={12} sm={4}
>









<div style={{fontSize:17,padding:15,fontWeight:498}}>Ex Spouse</div>
<b style={{marginLeft:15,fontWeight:'bold'}}>Sally Smith...</b>
</Grid>

  
    </Grid> */}
</div>
</div>



    <div 
     style={{display:'flex',
    backgroundColor:'white',
  


  
    // borderWidth:7,

    border: '1px solid black',
    width:927,height:'65px'}}
    >
        <div
         style={{marginTop:10,marginLeft:32,fontWeight:'bold',display:'flex',
    backgroundColor:'',
  

  marginTop:7,
   
    border: '1px solid black',
    width:47,height:'44px'}}
    >

<ArrowLeft size={30} style={{fontSize:34,marginLeft:4,marginTop:4,justifyContent:'center',alignItems:'center',display:'flex'}}/>


        </div>

        <div style={{marginTop:10,marginLeft:0.6,fontWeight:'bold',display:'flex',
    backgroundColor:'',
  

  marginTop:7,
    BorderColor:'black'
    ,
    border: '1px solid black',
    width:47,height:'44px'}}>

<ArrowRight size={30} style={{fontSize:34,marginLeft:4,marginTop:4,justifyContent:'center',alignItems:'center',display:'flex'}}/>


        </div>


        <div style={{fontWeight:'bold',padding:15}}>1-1 of 1</div>











        <div style={{marginTop:10,marginLeft:32,fontWeight:'bold',display:'flex',
    backgroundColor:'',
  

  marginTop:7,
   
    border: '1px solid black',
    width:77,height:'44px'}}>

<div style={{marginTop:7,fontSize:19,marginLeft:15}}>1</div>
<ArrowRight size={30} style={{fontSize:34,marginLeft:4,marginTop:4,justifyContent:'center',alignItems:'center',display:'flex'}}/>

        </div>

       


<div style={{fontWeight:'bold',padding:15}}>
    result per page
</div>








<div style={{marginTop:10,marginLeft:32,fontWeight:'bold',display:'flex',
    backgroundColor:'',
  

  marginTop:14,
   
    border: '1px solid black',
    width:87,height:'37px'}}>

<div style={{marginTop:3,fontSize:17,marginLeft:15}}>Export</div>


        </div>








        </div>







{/* <div style={{display:'flex',flexDirection:'row'}}>

<div style={{fontSize:17,padding:15,color:'blue'}}>00009-Smith</div><br></br>
<b style={{marginLeft:15}}>Dissolution Of Marriage</b>









</div> */}





    



<div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>


    </div>
    {/* {showFoodCart()} */}
    </div>
  );
}
