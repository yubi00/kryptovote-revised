import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../components/Header'
import App from '../components/App'
import Election from '../components/Election'
import Candidate from '../components/Candidate'
import Voter from '../components/Voter'
import NotFound from '../components/NotFound'
import CreateElection from '../components/CreateElection'

function AppRouter() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" component={App} exact />
          <Route path="/election" component={Election} />
          <Route path="/createelection" component={CreateElection} />
          <Route path="/candidate" component={Candidate} />
          <Route path="/voter" component={Voter} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default AppRouter
