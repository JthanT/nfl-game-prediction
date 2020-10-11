import React from 'react';
import { Close } from '@material-ui/icons';
import { 
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        height: '20px',
        width: '20px',
        marginLeft: '10px',
        color: 'red'
    },
});

function WrongPredictionIcon() {

    const classes = useStyles();
    
    return (
        <Close className={classes.root} />
    );
};

export default WrongPredictionIcon;
