import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import GameDetails from './GameDetails';
import { timeSelections, currentLeagueTimes } from '../utils/time';
import { GAME_SCHEDULE_BY_YEAR_QUERY } from '../graphql/queries/game.queries';

function GameList() {

    const { data, refetch } = useQuery(
        GAME_SCHEDULE_BY_YEAR_QUERY,
        {
            variables: {
                leagueYear: currentLeagueTimes.currentLeagueYear,
                leagueWeek: currentLeagueTimes.currentLeagueWeek
            },
        }
    );

    const [open, setOpen] = useState(false);
    const [id, setId] = useState<number>(0);
    const [leagueWeek, setLeagueWeek] = useState<number>(1);
    const [openWeekSelector, setOpenWeekSelector] = useState<boolean>(false);

    const handleOpenGameDetails = (gameId: string) => {
        setId(parseInt(gameId));
        setOpen(true);
    };

    const handleCloseGameDetails = () => {
        setOpen(false);
    };

    const handleOpenWeekSelector = () => {
        setOpenWeekSelector(true);
    };

    const handleCloseWeekSelector = () => {
        setOpenWeekSelector(false);
    };

    const handleWeekSelect = (week: number) => {
        setLeagueWeek(week);
        refetch({
            leagueYear: currentLeagueTimes.currentLeagueYear,
            leagueWeek: week,
        });
    };

    const classes = useStyles();

    return (
        <div>
            <Dialog onClose={handleCloseGameDetails} open={open} fullWidth={true} maxWidth={'md'}>
                <DialogActions>
                    <IconButton size="small" onClick={handleCloseGameDetails} className={classes.closeDialogButton}>
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
                <GameDetails gameId={id} />
            </Dialog>
            <div className={classes.tableContent}>
                <MUIDataTable
                    data={data ? data.game_schedule : []}
                    columns={[
                        {
                            label: ' ',
                            name: 'game_id',
                            options: {
                                display: "excluded",
                            },
                        },
                        {
                            label: 'Away Team',
                            name: 'team_1_name',
                        },
                        {
                            label: 'Home Team',
                            name: 'team_2_name',
                        },
                        {
                            label: 'Predicted Winner',
                            name: 'predicted_winner',
                        },
                        {
                            label: 'Date',
                            name: 'date',
                        },
                        {
                            label: 'Time (CST)',
                            name: 'time',
                        },
                    ]}
                    title={(
                        <FormControl className={classes.weekSelector}>
                            <InputLabel htmlFor="week-id">Week</InputLabel>
                            <Select
                                value={leagueWeek}
                                labelId="week-id"
                                onChange={
                                    (fieldValue) => 
                                        handleWeekSelect(fieldValue.target.value as number)
                                }
                                onClose={handleCloseWeekSelector}
                                onOpen={handleOpenWeekSelector}
                            >
                                {(
                                    timeSelections.leagueWeeks.map((week) => {
                                        return <MenuItem value={week}>{week}</MenuItem>
                                    })
                                )}
                            </Select>
                        </FormControl>
                    )}
                    options={{
                        print: false,
                        download: false,
                        viewColumns: false,
                        selectableRows: 'none',
                        filter: false,
                        rowsPerPage: 16,
                        rowsPerPageOptions: [],
                        onRowClick: (rowName) => handleOpenGameDetails(rowName[0]),
                    }}
                />
            </div>
        </div>
    );
}

export default GameList;

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
    weekSelector: {
        display: 'flex',
        width: '20%',
    },
});
