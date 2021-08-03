import React, {useState} from "react";
import { withRouter } from "react-router";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import NavBarSide from "./NavBarSide";
import NavBarHeader from "./NavBarHeader";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {  Link } from "react-router-dom"
import {TiHome} from 'react-icons/ti'
import {FaUserCircle} from 'react-icons/fa'
import {MdKeyboardArrowDown} from 'react-icons/md'
import './styles/navbar.css';
import logo from "../../images/logo.png";
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { alpha, makeStyles } from '@material-ui/core/styles';
import DashboardIcon from '@material-ui/icons/Dashboard';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
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
  controls: {
    borderRadius: '50px',
    marginLeft:  theme.spacing(2),
    padding: '0px !important'
  },
  avatar: {
    marginRight:  theme.spacing(1)
  },
  email: {
    fontSize: '15px',
    fontWeight: '400',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif "
  },
  name: {
    fontSize: '15px',
    fontWeight: '600',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif "
  },
  menuStyle: {
    top: '20px !important',
    right: '0px !important',
    width: 'auto'
  },
  userInfo: {
    borderBottom: '0.8px #c5c6c7 solid'
  }
}))

function HideOnScroll(props) {
  const { children, window } = props;
 
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const NavBar = (props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleLogOut = () => {
      sessionStorage.clear();
      props.history.push(`/`)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      className = {classes.menuStyle}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className = {classes.userInfo}>
        <Avatar src="/broken-image.jpg"  className={classes.avatar}/>
        <Grid container direction="column" wrap="nowrap">
          <Grid item>
            <Typography variant="h6" className={classes.name} noWrap>
              {props.first}  {props.last}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" className={classes.email} noWrap>
              {props.email} 
            </Typography>
          </Grid>
        </Grid>
      </MenuItem>
      <Link className="link-style" to='/homePage/profile'> 
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <PersonSharpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
      </Link>
      <MenuItem onClick={handleLogOut}>
        <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  )

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
    <>
      <div className={classes.grow}>
        <AppBar className="navbar-style" position="fixed">
          <Toolbar>

            <Typography variant="h6" noWrap>
             <Link to="/homePage/dashboard"> <img src={logo} alt="logo" className="logo-style" /> </Link>
            </Typography>

            <Link to="/homePage/Dashboard">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <TiHome />
              </IconButton>
            </Link> 

            <Link to="/homePage/workspace">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <DashboardIcon />
              </IconButton>
            </Link>

            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
              {/* <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={props.notiication} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
             
              {/* <div className={classes.controls}> */}
                

                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    // className={classes.menuButton}
                    color="inherit"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    className={classes.controls}
                  >
                    <Avatar src="/broken-image.jpg"  className={classes.avatar}/>

                    {/* <Typography variant="h6" className={classes.name} noWrap>
                      Welcome, {props.first}  {props.last}
                    </Typography> */}

                    <MdKeyboardArrowDown />  

                  </IconButton>
                {/* </dxiv> */}
            </div>
            
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
      {/* <NavBarHeader menuIconClick={menuIconClick} />
      <NavBarSide menuCollapse={menuCollapse} /> */}
    </>
  )
}

export default withRouter(NavBar)
