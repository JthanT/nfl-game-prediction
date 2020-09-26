import React from 'react';
import { 
    makeStyles,
    CircularProgress, 
    Typography
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        paddingTop: '35px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loadingIcon: {
        paddingTop: '25px',
    },
});

function PageLoading(
  
) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant='h5'>
                Loading...
            </Typography>
            <div className={classes.loadingIcon}>
                <CircularProgress />
            </div>
        </div>
    );
}

export default PageLoading;
