import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

/**
 * Loader overlay to show during API calls.
 * Usage: <LoaderOverlay open={loading} />
 */
export default function LoaderOverlay({ open }) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 999 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}