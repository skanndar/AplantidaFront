import Axios from 'axios'

const search = (searchStr) => {
    Axios
      .post(
        process.env.REACT_APP_API_URL + "/api/plants",
        { searchStr },
        { withCredentials: true }
      )
      .then((response) => {
        this.setState(
          { plants: response.data, errorMessage: undefined },
          () => {
            this.props.history.push({
              pathname: "/search",
              state: { plants: this.state.plants },
            });
          }
        );
      })
      .catch((err) => {
        this.setState({
          errorMessage: "Please login or register to be able to search",
        });
        setTimeout(() => {
          this.setState({ errorMessage: undefined });
        }, 2500);
      });
  }

  export default search