import { Component } from 'react';
import { setIdToken, setAccessToken } from '../utils/AuthService';
import history from '../utils/history';

class Callback extends Component {

  componentDidMount() {
    setAccessToken();
    setIdToken();
    window.location.href = "/main";
  }

  render() {
    return null;
  }
}

export default Callback;