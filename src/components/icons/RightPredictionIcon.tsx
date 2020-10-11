import React from 'react';
import { Check } from '@material-ui/icons';
import { 
    makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        height: '20px',
        width: '20px',
        marginLeft: '10px',
        color: 'green'
    },
});

function RightPredictionIcon() {

    const classes = useStyles();
    
    return (
        <Check className={classes.root} />
    );
};

export default RightPredictionIcon;
