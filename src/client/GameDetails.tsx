import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { outcomeConfidence } from '../utils/game';
import { GAME_SCHEDULE_BY_ID_QUERY } from '../graphql/queries/game.queries';

function GameDetails(props: {gameId: number}) {
    
    const { data } = useQuery(
        GAME_SCHEDULE_BY_ID_QUERY,
        {
            variables: {
                id: props.gameId
            },
        }
    );

    const outcome = outcomeConfidence(data?.game_schedule[0].team_1_grade, data?.game_schedule[0].team_2_grade);

    const classes = useStyles();

    return (
        <div>
            <DialogTitle>
                {data?.game_schedule[0].team_1_name} @ {data?.game_schedule[0].team_2_name}
            </DialogTitle>
            <DialogContent dividers>
                <Typography>
                    Predicted Winner
                </Typography>
                <Typography>
                    {data?.game_schedule[0].predicted_winner}
                </Typography>
            </DialogContent>

            <DialogContent dividers>
                <Typography>
                    {outcome}
                </Typography>
            </DialogContent>

            <DialogContent dividers className={classes.teamGradesRow}>
                <div className={classes.tradeGrades}>
                    <Typography>
                        {data?.game_schedule[0].team_1_name} Grade
                    </Typography>
                    <Typography>
                        {data?.game_schedule[0].team_1_grade}
                    </Typography>
                </div>
                
                <div className={classes.tradeGrades}>
                    <Typography>
                        {data?.game_schedule[0].team_2_name} Grade
                    </Typography>
                    <Typography>
                        {data?.game_schedule[0].team_2_grade}
                    </Typography>
                </div>
            </DialogContent>
        </div>
    );
}

export default GameDetails;

const useStyles = makeStyles({
    teamGradesRow: {
        display: 'flex',
    },
    tradeGrades: {
        paddingRight: '50px',
    },
});
