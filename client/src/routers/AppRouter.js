import { hot } from 'react-hot-loader/root'
import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { history } from './history'
import App from '../components/App'
import ElectionDashboard from '../components/ElectionDashboard'
import CandidateList from '../components/CandidateList'
import Voter from '../components/Voter'
import NotFound from '../components/NotFound'
import CreateElection from '../components/CreateElection'
import CreateCandidate from '../components/CreateCandidate'
import AdminDashboard from '../components/AdminDashboard'
import Header from '../components/Header'
import AuthRoute from './AuthRoute'
import PublicRoute from './PublicRoute'
import Vote from '../components/Vote'
import Result from '../components/Result'

function AppRouter() {
  return (
    <Router history={history}>
      <Header />
      <Switch>
        <PublicRoute path="/" component={App} exact />
        <AuthRoute path="/admindashboard" component={AdminDashboard} />
        <AuthRoute path="/election" component={ElectionDashboard} />
        <AuthRoute path="/createelection" component={CreateElection} />
        <AuthRoute path="/candidate" component={CandidateList} />
        <AuthRoute path="/createcandidate" component={CreateCandidate} />
        <AuthRoute path="/voter" component={Voter} />
        <AuthRoute path="/vote" component={Vote} />
        <AuthRoute path="/results" component={Result} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

export default hot(AppRouter)
