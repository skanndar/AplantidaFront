import React from "react";
import axios from "axios";
import { Skeleton } from "antd";

const { Consumer, Provider } = React.createContext();

// HOC
function withAuth(WrappedComponent) {
  return function (props) {
    return (
      <Consumer>
        {(valueFromProvider) => (
          <WrappedComponent
            {...props}
            user={valueFromProvider.user}
            isLoggedIn={valueFromProvider.isLoggedIn}
            isLoading={valueFromProvider.isLoading}
            login={valueFromProvider.login}
            signup={valueFromProvider.signup}
            logout={valueFromProvider.logout}
            errorMessage={valueFromProvider.errorMessage}
            me={valueFromProvider.me}
          />
        )}
      </Consumer>
    );
  };
}

class AuthProvider extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
    errorMessage: undefined,
  };

  componentDidMount() {
    // When app and AuthProvider load for the first time
    // make a call to the server '/me' and check if user is authenitcated
    axios
      .get(process.env.REACT_APP_API_URL + "/auth/me", {
        withCredentials: true,
      })
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) =>
        this.setState({ isLoggedIn: false, isLoading: false, user: null })
      );
  }

  me = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/auth/me", {
        withCredentials: true,
      })
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) =>
        this.setState({ isLoggedIn: false, isLoading: false, user: null })
      );
  };

  login = (email, password) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/auth/login",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) => console.log(err));
  };

  signup = (agreement, confirm, email, fName, genre, lName, password) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/auth/signup",
        { agreement, confirm, email, fName, genre, lName, password },
        { withCredentials: true }
      )
      .then((response) => {
        const user = response.data;
        this.setState({
          isLoggedIn: true,
          isLoading: false,
          user,
          errorMessage: undefined,
        });
      })
      .catch((err) => {
        this.setState({
          isLoggedIn: false,
          isLoading: false,
          errorMessage: "Something went wrong, try again!",
        });
        console.log(err);
      });
  };

  logout = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/auth/logout", {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({ isLoggedIn: false, isLoading: false, user: null });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { user, isLoggedIn, isLoading, errorMessage } = this.state;
    const { login, signup, logout, me } = this;

    return (
      <Provider
        value={{
          user,
          isLoggedIn,
          isLoading,
          login,
          signup,
          logout,
          errorMessage,
          me,
        }}
      >
        {isLoading ? (
          <Skeleton active paragraph={{ rows: 16 }} />
        ) : (
          this.props.children
        )}
      </Provider>
    );
  }
}

export { withAuth, AuthProvider };
