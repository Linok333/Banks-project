import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LibraryAddCheckSharpIcon from '@material-ui/icons/LibraryAddCheckSharp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import './Drawer.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

export default function PersistentDrawerLeft() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Navigation
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<div className='drawer-box'>
					<div className='drab'>
						<div className="w"> <Link className='lil' to="/" style={{ color: 'gray' }} >  <HomeIcon style={{ fontSize: 31.66, color: 'gray' }} /> </Link>  </div>
						<div className='h' > <Link style={{ textDecoration: 'none', color: 'black' }} to="/"> Main </Link> </div>
					</div>

					<div className='drab' >
						<div className='w'> <Link to="/Banks" > <LocalAtmIcon style={{ fontSize: 31.66, color: 'gray' }}/> </Link>   </div>
						<div className='h'> <Link style={{ textDecoration: 'none', color: 'black' }} to="/Banks" > Banks </Link> </div>

					</div>

					<div className='drab' >
						<div className='w'>
							<Link to="/CalculatorPage" style={{ color: 'gray' }} >
								<LibraryAddCheckSharpIcon style={{ fontSize: 31.66, color: 'gray' }} />
							</Link>
						</div>
						<div className='h'> <Link style={{ textDecoration: 'none', color: 'black' }} to="/CalculatorPage">  Calculator </Link> </div>
					</div>

					<div className='drab' >
						<div className='w'>
							<Link to="/Charts" style={{ color: 'gray' }} >
								< AssessmentIcon style={{ fontSize: 31.66, color: 'gray' }} />
							</Link>
						</div>
						<div className='h'> <Link style={{ textDecoration: 'none', color: 'black' }} to="/Charts"> Charts </Link> </div>
					</div>
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
			</main>
		</div>
	);
}
