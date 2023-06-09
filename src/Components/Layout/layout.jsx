import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import sidebarConfig from "./sidebarConfig";

// material ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";

import Logo from "../../Assets/ge_logo.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "#f2fffb",
          boxShadow: "none",
          borderBottom: "none",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "black",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: "black",
              fontWeight: "700",
              fontFamily: "Rubik, sans-serif",
              fontSize: "24px",
            }}
            noWrap
            component="div"
          >
            Grassroots Economics Test
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <Box sx={{ width: "80%", display: "flex", alignItems: "center" }}>
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={Logo}
                  alt="logo"
                />
                <Typography
                  sx={{
                    ml: ".5rem",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Grassroots Economics
                </Typography>
                <ChevronLeftIcon sx={{ ml: "1.2rem" }} />
              </Box>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            "& li div span": {
              fontWeight: "400",
              fontFamily: "Rubik, sans-serif",
              fontSize: ".88rem",
            },
            "& li.Mui-selected": {
              background: "linear-gradient(to right, #00c200, #074ea6)",
              color: "white",
            },
            "& li.Mui-selected div svg": {
              color: "white",
            },
            "& li.Mui-selected div span": {
              fontFamily: "Rubik, sans-serif",
              fontWeight: "700",
              fontSize: ".88rem",
              color: "white",
            },
          }}
        >
          {sidebarConfig.map((navItem) => (
            <ListItem
              key={navItem.title}
              disablePadding
              selected={navItem.path === pathname}
              sx={{
                display: "block",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              onClick={() => navigate(navItem.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip title={navItem.label} placement="right" arrow>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    {navItem.icon}
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary={navItem.label}
                  sx={{
                    opacity: open ? 1 : 0,
                    "&:hover": {
                      color: "white",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ backgroundColor: "#f2fffb", flexGrow: 1, p: 3 }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
