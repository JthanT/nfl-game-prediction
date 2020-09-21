import React from 'react';
import { 
    makeStyles, 
    Dialog, 
    DialogActions, 
    IconButton, 
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const useStyles = makeStyles({
    closeDialogButton: {
        position: 'absolute',
        left: '94%',
        top: '2%',
        backgroundColor: 'lightgray',
        color: 'gray',
    },
});

function DialogBox(
    props: {
        handleClose: () => void,
        open: boolean,
        components: JSX.Element,
        width?: "sm" | "xs" | "md" | "lg" | "xl" | undefined,
    }
) {
    const classes = useStyles();

    return (
        <Dialog 
            onClose={props.handleClose} 
            open={props.open} 
            fullWidth={true} 
            maxWidth={props.width ? props.width : 'sm'}
        >
            <DialogActions>
                <IconButton 
                    size="small" 
                    onClick={props.handleClose} 
                    className={classes.closeDialogButton}
                >
                    <Close />
                </IconButton>
            </DialogActions>
            {props.components}
        </Dialog>
    );
}

export default DialogBox;
