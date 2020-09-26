import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import MUIDataTable from "mui-datatables";
import { 
    Dialog,
    makeStyles,
    DialogActions,
    IconButton
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { TEAM_DETAILS_QUERY } from '../graphql/queries/team.queries';
import TeamDetails from './TeamDetails';
import PageLoading from '../components/PageLoading';

function TeamList() {

    const { data, loading } = useQuery(TEAM_DETAILS_QUERY);

    const [open, setOpen] = useState(false);
    const [id, setId] = useState<number>(0);
    
    const handleOpen = (id: number) => {
        setId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    return (
        <div>
            <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={'lg'}>
                <DialogActions>
                    <IconButton size="small" onClick={handleClose} className={classes.closeDialogButton}>
                        <Close />
                    </IconButton>
                </DialogActions>
                <TeamDetails teamId={id} />
            </Dialog>
            <div className={classes.tableContent}>
                {!loading ? (
                    <MUIDataTable
                        data={data ? data.team_details : []}
                        columns={[
                            {
                                label: ' ',
                                name: 'team_id',
                                options: {
                                    display: "excluded",
                                },
                            },
                            {
                                label: 'Team',
                                name: 'name',
                            },
                            {
                                label: 'Offence Rank',
                                name: 'offence_ranking',
                            },
                            {
                                label: 'Defence Rank',
                                name: 'defence_ranking',
                            },
                            {
                                label: 'Special Teams Rank',
                                name: 'special_teams_ranking',
                            },
                            {
                                label: 'Team Grade',
                                name: 'grade',
                            },
                            {
                                label: 'Bye Week',
                                name: 'bye_week',
                            },
                        ]}
                        title="2020 Season Team Grades"
                        options={{
                            print: false,
                            download: false,
                            viewColumns: false,
                            selectableRows: 'none',
                            filter: false,
                            rowsPerPage: 16,
                            rowsPerPageOptions: [],
                            onRowClick: (rowName) => handleOpen(parseInt(rowName[0])),
                        }}
                    />
                ) : (
                    <PageLoading />
                )}
            </div>
        </div>
    );
}

export default TeamList;

const useStyles = makeStyles({
    tableContent: {
        padding: '10px',
    },
    closeDialogButton: {
        position: 'absolute',
        left: '95%',
        top: '2%',
        backgroundColor: 'lightgray',
        color: 'gray',
    },
    teamSelectors: {
        display: 'flex',
    },
});