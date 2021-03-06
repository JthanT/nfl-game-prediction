import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import MUIDataTable from "mui-datatables";
import { 
    makeStyles,
    Select, 
    MenuItem, 
    FormControl,
    Typography,
} from '@material-ui/core';
import { format } from 'date-fns';
import { GAME_SCHEDULE_BY_YEAR_QUERY } from '../graphql/queries/game.queries';
import { timeSelections, currentLeagueTimes } from '../utils/time';
import GameDetails from './GameDetails';
import DialogBox from '../components/DialogBox';
import PageLoading from '../components/PageLoading';
import RightPredictionIcon from '../components/icons/RightPredictionIcon';
import WrongPredictionIcon from '../components/icons/WrongPredictionIcon';

const useStyles = makeStyles({
    rightRoot: {
        backgroundColor: '#ECFFE9'
    },
    wrongRoot: {
        backgroundColor: '#FFEDE9'
    },
    undeterminedRoot: {
        backgroundColor: 'white'
    },
    tableContent: {
        padding: '10px',
    },
    selectors: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: '10px'
    },
    timeSelector: {
        display: 'flex',
        width: '100px',
        paddingRight: '20px',
    },
    winnerRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
});

function GameList() {

    const { data, refetch, loading } = useQuery(
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

    const predictionCorrectness = (predicted?: string, winner?: string) => {
        if (predicted && winner) { 
            if (predicted === winner) {
                return 'right';
            } else {
                return 'wrong';
            }
        } else {
            return 'undetermined';
        }
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
                {!loading ? (
                    <MUIDataTable
                        data={data?.game_schedule ?? []}
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
                                options: {
                                    customBodyRender: (value, tableMeta) => {
                                        const accuracy = predictionCorrectness(tableMeta.rowData[3], tableMeta.rowData[4]);
                                        return (
                                            <div className={classes.winnerRow}>
                                                <Typography>
                                                    {value}
                                                </Typography>
                                                {accuracy === 'right' && <RightPredictionIcon />}
                                                {accuracy === 'wrong' && <WrongPredictionIcon />}
                                            </div>
                                        );
                                    }
                                }
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
                ) : (
                    <PageLoading />
                )}
            </div>
        </div>
    );
}

export default GameList;
