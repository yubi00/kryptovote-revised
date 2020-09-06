import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
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

export const history = createBrowserHistory()

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
        <Route path="/voter" component={Voter} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default AppRouter
