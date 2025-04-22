import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const NetworkStatus = () => {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <Snackbar
            open={isOffline}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert severity="warning" variant="filled">
                No Internet Connection. Please check your network!
            </Alert>
        </Snackbar>
    );
};

export default NetworkStatus;
