import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { TEAM_DETAILS_BY_ID_QUERY } from '../graphql/queries/team.queries';

function TeamDetails(props: {teamId: number}) {
    
    const { data } = useQuery(
        TEAM_DETAILS_BY_ID_QUERY,
        {
            variables: {
                id: props.teamId
            },
        }
    );

    const classes = useStyles();

    return (
        <div>
            <DialogTitle>
                {data?.team_details[0].name}
            </DialogTitle>
            <DialogContent dividers className={classes.inputRow}>
                <DialogContent>
                    <Typography>
                        Team Grade
                    </Typography>
                    <Typography>
                        {data?.team_details[0].grade}
                    </Typography>
                </DialogContent>
                <DialogContent >
                    <Typography>
                        Offence Rank
                    </Typography>
                    <Typography>
                        {data?.team_details[0].offence_ranking}
                    </Typography>
                </DialogContent>
                <DialogContent>
                    <Typography>
                        Defence Rank
                    </Typography>
                    <Typography>
                        {data?.team_details[0].defence_ranking}
                    </Typography>
                </DialogContent>
                <DialogContent>
                    <Typography>
                        Special Teams Rank
                    </Typography>
                    <Typography>
                        {data?.team_details[0].special_teams_ranking}
                    </Typography>
                </DialogContent>
            </DialogContent>
        </div>
    );
}

export default TeamDetails;

const useStyles = makeStyles({
    inputRow: {
        display: 'flex',
    },
    teamSelectors: {
        display: 'flex',
    },
    dataButtons: {
        textTransform: 'none',
        marginLeft: '8px',
    },
    buttonRow: {
        display: 'flex', 
        justifyContent: 'flex-end',
    },
    confirmationText: {
        display: 'flex', 
        justifyContent: 'flex-start',
    },
});
