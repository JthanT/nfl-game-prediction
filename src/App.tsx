import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import TeamList from './client/TeamList';
import TeamDetails from './client/TeamDetails';
import GameList from './client/GameList';
import PastSeasonGameList from './client/PastSeasonGameList';
import GameDetails from './client/GameDetails';
import ApolloClient from "apollo-client";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";

interface Definition {
  kind: string;
  operation?: string;
};

function App() {

  const httpLink = new HttpLink({
    uri: "https://nfl-game-prediction.herokuapp.com/v1/graphql"
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  const classes = useStyles();

  return (
    <ApolloProvider client={client}>
      <div className={classes.root}>
        <Router>
          <AppBar position="static" className={classes.navBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.navBarTitle}>
                NFL Game Predictor
              </Typography>
              <Link to={"/"} className={classes.navBarSectionTitles}>
                Team List
              </Link>
              <Link to={"/game-list"} className={classes.navBarSectionTitles}>
                Schedule
              </Link>
              <Link to={"/past-season-game-list"} className={classes.navBarSectionTitles}>
                Past Seasons
              </Link>
            </Toolbar>
          </AppBar>
            <Switch>  
              <Route exact path='/' component={TeamList} />
              <Route path='/team-details' component={TeamDetails} />
              <Route path='/game-list' component={GameList} />
              <Route path='/past-season-game-list' component={PastSeasonGameList} />
              <Route path='/game-details' component={GameDetails} />
              <Route render={() => <Redirect to={{pathname: "/"}} />} />
            </Switch>
        </Router>
    </div>
    </ApolloProvider>
  );
}

export default App;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#dae4f2',
  },
  navBarTitle: {
    flexGrow: 1,
  },
  navBarSectionTitles: {
    flexGrow: 1,
    textDecoration: 'none',
    color: "white",
  },
  navBar: {
    backgroundColor: '#1a468a',
  }
});
