import {withRouter} from 'react-router-dom'

//signs out the authenticated user and redirects the user to the default route.
const SignOut = (props) => {
  props.signOut()
  props.history.push("/courses")
  return null;
}

export default withRouter(SignOut)