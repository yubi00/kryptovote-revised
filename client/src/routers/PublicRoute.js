import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export const PublicRoute = ({
  isAuthenticated,
  admin,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthenticated && admin ? (
        <Redirect to="/admindashboard" />
      ) : (
        <div>
          <Component {...props} />
        </div>
      )
    }
  />
)

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin
})

export default connect(mapStateToProps)(PublicRoute)
