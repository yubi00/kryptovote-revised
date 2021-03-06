import { firebaseAuth, functions } from '../firebase/firebase'
import { returnErrors } from './errors'

export const registerUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      )
      //add admin role for admin
      const addAdminRole = functions.httpsCallable('addAdminRole')
      await addAdminRole({ email })

      dispatch({ type: 'REGISTER_USER', user: response.user })
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL' })
      const errorCode = error.code
      const errorMessage = error.message
      if (errorCode === 'auth/weak-password') {
        dispatch(returnErrors('The password is too weak.', 'REGISTER_FAIL'))
      } else if (errorCode === 'auth/invalid-email') {
        dispatch(returnErrors('Ooops! Email not recognized', 'REGISTER_FAIL'))
      } else {
        dispatch(returnErrors(errorMessage, 'REGISTER_FAIL'))
      }
    }
  }
}

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      )
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          user.getIdTokenResult().then((idTokenResult) => {
            const admin = idTokenResult.claims.admin
            if (admin) {
              dispatch({ type: 'LOGIN_USER', user: response.user, admin })
            } else {
              dispatch({
                type: 'LOGIN_USER',
                user: response.user,
                admin: false
              })
            }
          })
        } else {
          dispatch(logout())
        }
      })
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL' })
      const errorCode = error.code
      const errorMessage = error.message
      if (
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/invalid-email' ||
        errorCode === 'auth/user-not-found'
      ) {
        dispatch(returnErrors('Invalid email or password', 'LOGIN_FAIL'))
      } else {
        dispatch(returnErrors(errorMessage, 'LOGIN_FAIL'))
      }
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    try {
      await firebaseAuth.signOut()
      dispatch({ type: 'LOG_OUT' })
    } catch (error) {
      console.log(error)
    }
  }
}
