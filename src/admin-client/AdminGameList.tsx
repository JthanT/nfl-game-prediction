import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import AdminGameInsert from '../admin-client/AdminGameInsert';
import AdminModifyGameDetails from '../admin-client/AdminModifyGameDetails';
import { GAME_SCHEDULE_BY_YEAR_QUERY } from '../graphql/queries/game.queries';

function AdminGameList() {

    const currentWeek = 1;
    const currentYear = 2020;
    const years = ["2020", "2021"];
    const weeks = [
        "1", "2", "3", "4", "5", "6", "7", "8", 
        "9", "10", "11", "12", "13", "14", "15", "16",
        "17"
    ];

    const { data, refetch } = useQuery(
        GAME_SCHEDULE_BY_YEAR_QUERY,
        {
            variables: {
                leagueYear: currentYear,
                leagueWeek: currentWeek,
            },
        }
    );

    const [openDetails, setOpenDetails] = useState(false);
    const [openGameInsert, setOpenGameInsert] = useState(false);
    const [id, setId] = useState<number>(0);
    const [leagueYear, setLeagueYear] = useState<number>(currentYear);
    const [openYearSelector, setOpenYearSelector] = useState<boolean>(false);
    const [leagueWeek, setLeagueWeek] = useState<number>(currentWeek);
    const [openWeekSelector, setOpenWeekSelector] = useState<boolean>(false);

    const handleOpenDetails = (gameId: number) => {
        setId(gameId);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    const handleOpenGameInsert = () => {
        setOpenGameInsert(true);
    };

    const handleCloseGameInsert = () => {
        setOpenGameInsert(false);
    };

    const handleOpenYearSelector = () => {
        setOpenYearSelector(true);
    };

    const handleCloseYearSelector = () => {
        setOpenYearSelector(false);
    };

    const handleLeagueYearSelect = (year: number) => {
        setLeagueYear(year);
        refetch({
            leagueYear: year,
            leagueWeek: 1
        });
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
            leagueYear: leagueYear,
            leagueWeek: week,
        });
    };

    const classes = useStyles();

    return (
        <div>
            <Dialog 
                onClose={handleCloseDetails} 
                open={openDetails} 
                fullWidth={true} 
                maxWidth={'lg'}
            >
                <DialogActions>
                    <IconButton 
                        size="small" 
                        onClick={handleCloseDetails} 
                        className={classes.closeDialogButton}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
                <AdminModifyGameDetails 
                    gameId={id} 
                    refetchGameDetails={() => refetch({
                        leagueYear: leagueYear,
                        leagueWeek: leagueWeek,
                    })} 
                    closeDetailsMenu={handleCloseDetails} 
                />
            </Dialog>
            <Dialog 
                onClose={handleCloseGameInsert} 
                open={openGameInsert} 
                fullWidth={true} 
                maxWidth={'lg'}
            >
                <DialogActions>
                    <IconButton 
                        size="small" 
                        onClick={handleCloseGameInsert} 
                        className={classes.closeDialogButton}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogActions>
                <AdminGameInsert 
                    refetchGames={() => refetch({
                        leagueYear: leagueYear,
                        leagueWeek: leagueWeek,
                    })} 
                />
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
                        <div className={classes.selectors}>
                            <div className={classes.addGameButton}>
                                <Button 
                                    className={classes.button} 
                                    variant="outlined" 
                                    onClick={handleOpenGameInsert}
                                >
                                    Add Game
                                </Button>
                            </div>
                            <FormControl className={classes.yearSelector}>
                                <InputLabel htmlFor="year-id">League Year</InputLabel>
                                <Select
                                    value={leagueYear}
                                    labelId="year-id"
                                    onChange={
                                        (fieldValue) => 
                                            handleLeagueYearSelect(fieldValue.target.value as number)
                                    }
                                    onClose={handleCloseYearSelector}
                                    onOpen={handleOpenYearSelector}
                                >
                                    {(
                                        years.map((year) => {
                                            return <MenuItem value={year}>{year}</MenuItem>
                                        })
                                    )}
                                </Select>
                            </FormControl>
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
                                        weeks.map((week) => {
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

export default AdminGameList;

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
    button: {
        textTransform: 'none',
    },
    selectors: {
        display: 'flex',
    },
    addGameButton: {
        paddingRight: '10px',
    },
    yearSelector: {
        display: 'flex',
        width: '25%',
        paddingRight: '10px',
    },
    weekSelector: {
        display: 'flex',
        width: '20%',
    },
});
