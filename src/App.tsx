import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import TeamList from './pages/TeamList';
import TeamDetails from './pages/TeamDetails';
import GameList from './pages/GameList';
import PastSeasonGameList from './pages/PastSeasonGameList';
import GameDetails from './pages/GameDetails';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink
} from '@apollo/client';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import { ApolloProvider } from "@apollo/react-hooks";

const useStyles = makeStyles({
  root: {
    height: '100%',
    backgroundColor: '#deebff',
  },
  navBarTitle: {
    paddingRight: '100px',
  },
  linksRow: {
    paddingRight: '50px',
  },
  links: {
    textDecoration: 'none',
    color: "white",
  },
  navBar: {
    backgroundColor: '#1a468a',
  }
});

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
              <div className={classes.navBarTitle}>
                <Typography variant="h6">
                  NFL Game Predictor
                </Typography>
              </div>
              <div className={classes.linksRow}>
                <Link to={"/"} className={classes.links}>
                  Team List
                </Link>
              </div>
              <div className={classes.linksRow}>
                <Link to={"/game-list"} className={classes.links}>
                  Schedule
                </Link>
              </div>
              <div className={classes.linksRow}>
                <Link to={"/past-season-game-list"} className={classes.links}>
                  Past Seasons
                </Link>
              </div>
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
