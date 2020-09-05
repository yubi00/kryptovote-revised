import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../components/Header'
import App from '../components/App'
import ElectionDashboard from '../components/ElectionDashboard'
import CandidateList from '../components/CandidateList'
import Voter from '../components/Voter'
import NotFound from '../components/NotFound'
import CreateElection from '../components/CreateElection'
import CreateCandidate from '../components/CreateCandidate'

function AppRouter() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={App} exact />
          <Route path="/election" component={ElectionDashboard} />
          <Route path="/createelection" component={CreateElection} />
          <Route path="/candidate" component={CandidateList} />
          <Route path="/createcandidate" component={CreateCandidate} />
          <Route path="/voter" component={Voter} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
