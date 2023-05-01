import React from "react";
import {
    Box,
    Typography,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Button,
} from "@mui/material";
import { Grid } from "@mui/material";
import useAuthStore from "./../utils/store";
import { Route, Routes, useLocation, Link } from "react-router-dom";

const ScholarshipListing = React.lazy(() =>
    import("./../pages/ScholarshipListing")
);
const ProfilePage = React.lazy(() => import("./../pages/Profile/ProfilePage"));
const UserManagementPage = React.lazy(() =>
    import("./../pages/UserManagementPage")
);
const ScholarsListPage = React.lazy(() =>
    import("./../pages/ScholarsListPage")
);
const ScholarshipsPage = React.lazy(() =>
    import("./../pages/ScholarshipsPage")
);
const FoundationsPage = React.lazy(() => import("./../pages/FoundationsPage"));
const ApplicationPage = React.lazy(() => import("./../pages/ApplicationPage"));
const LogsPage = React.lazy(() => import("../pages/LogsPage"));

import HomePage from "./../pages/HomePage";

import { LogoutIcon } from "@mui/icons-material/Logout";
import { profileShow } from "./../utils/apisauce";

const RightSection = () => {
    const { role } = useAuthStore();
    const location = useLocation();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [profile, setProfile] = React.useState();

    const handleFetchUser = async () => {
        const res = await profileShow();

        console.log("res", res);
        if (res.data.code == 200) {
            setProfile(res.data.data);
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    React.useEffect(() => {
        handleFetchUser();
    }, []);

    return (
        <React.Fragment>
            <Box sx={{ width: "100%" }}>
                <Grid container backgroundColor="#fff">
                    <Box
                        px="2.5rem"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "10vh",
                            width: "100%",
                        }}
                    >
                        {/* <Typography sx={{ textDecoration: ' ', color: "white", fontWeight: 'bold' }}>
              {`${location.pathname.split('/')[1].toUpperCase()} PAGE`}
            </Typography> */}
                    </Box>

                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route
                            path="/listing"
                            element={<ScholarshipListing />}
                        />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/users" element={<UserManagementPage />} />
                        <Route
                            path="/scholars"
                            element={<ScholarsListPage />}
                        />
                        <Route
                            path="/scholarships"
                            element={<ScholarshipsPage />}
                        />
                        <Route
                            path="/benefactor"
                            element={<FoundationsPage />}
                        />
                        <Route
                            path="/application"
                            element={<ApplicationPage />}
                        />
                        <Route path="/logs" element={<LogsPage />} />
                    </Routes>
                </Grid>
            </Box>
        </React.Fragment>
    );
};

export default RightSection;
