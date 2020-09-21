import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import MUIDataTable from "mui-datatables";
import { 
    makeStyles,
    Select, 
    MenuItem, 
    FormControl,
    Typography
} from '@material-ui/core';
import { format } from 'date-fns';
import GameDetails from './GameDetails';
import { timeSelections, currentLeagueTimes } from '../utils/time';
import { GAME_SCHEDULE_BY_YEAR_QUERY } from '../graphql/queries/game.queries';
import DialogBox from '../components/DialogBox';

const useStyles = makeStyles({
    tableContent: {
        padding: '10px',
    },
    closeDialogButton: {
        position: 'absolute',
        left: '94%',
        top: '2%',
        backgroundColor: 'lightgray',
        color: 'gray',
    },
    button: {
        textTransform: 'none',
    },
    selectors: {
        display: 'flex',
        alignItems: 'center'
    },
    timeSelector: {
        display: 'flex',
        width: '100px',
        paddingRight: '20px',
    },
});

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

    const classes = useStyles();
    
    const [openDetails, setOpenDetails] = useState(false);
    const [id, setId] = useState<number>(0);
    const [leagueWeek, setLeagueWeek] = useState<number>(currentLeagueTimes.currentLeagueWeek);

    const handleOpenDetails = (gameId: number) => {
        setId(gameId);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    const handleWeekSelect = (week: number) => {
        setLeagueWeek(week);
        refetch({
            leagueYear: currentLeagueTimes.currentLeagueYear,
            leagueWeek: week,
        });
    };

    return (
        <div>
            <DialogBox
                handleClose={handleCloseDetails} 
                open={openDetails} 
                components={
                    <GameDetails 
                    gameId={id} 
                    closeDetailsMenu={handleCloseDetails} 
                />
                }
            />
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
                            label: 'Winner',
                            name: 'winning_team',
                        },
                        {
                            label: 'Date',
                            name: 'date',
                            options: {
                                customBodyRender: (value, tableMeta) => {
                                    const timeStamp = value + 'T' + tableMeta.rowData[6];
                                    return format(new Date(timeStamp), 'MMM d');
                                }
                            }
                        },
                        {
                            label: 'Time (CST)',
                            name: 'time',
                            options: {
                                customBodyRender: (value, tableMeta) => {
                                    const timeStamp = tableMeta.rowData[5] + 'T' + value;
                                    return format(new Date(timeStamp), 'h:mm a');
                                }
                            }
                        },
                    ]}
                    title={(
                        <div className={classes.selectors}>
                            <FormControl className={classes.timeSelector}>
                                <Typography>Week</Typography>
                                <Select
                                    value={leagueWeek}
                                    onChange={
                                        (fieldValue) => 
                                            handleWeekSelect(fieldValue.target.value as number)
                                    }
                                >
                                    {(
                                        timeSelections.leagueWeeks.map((week) => {
                                            return <MenuItem value={week}>{week}</MenuItem>
                                        })
                                    )}
                                </Select>
                            </FormControl>
                        </div>
                    )}
                    options={{
                        print: false,
                        download: false,
                        viewColumns: false,
                        selectableRows: 'none',
                        filter: false,
                        rowsPerPage: 16,
                        rowsPerPageOptions: [],
                        onRowClick: (rowName) => handleOpenDetails(parseInt(rowName[0])),
                    }}
                />
            </div>
        </div>
    );
}

export default GameList;
