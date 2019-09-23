import {withRouter} from 'react-router-dom'

//used for when the sign out button is clicked, activates the sign out method in the signIn component and clears all local storage
const SignOut = (props) => {
  props.signOut()
  props.history.push("/")
}

export default withRouter(SignOut)