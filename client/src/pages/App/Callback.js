import { Component } from 'react';
import { setIdToken, setAccessToken } from '../../utils/AuthService';
import history from '../../utils/history';
import api from '../../utils/api';

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    api.userLoggedIn().then(() => window.location.href = "/main");

  }

  render() {
    return null;
  }
}

export default Callback;