import axios from 'axios';
import {getAccessToken, getIdToken} from './AuthService';
export default {
  test(){
    axios.get("/authorized", 
              { headers: 
                { Authorization: `Bearer ${getAccessToken()}`}
              })
         .then(response => console.log(response.data));
  },
  getUser(){
    axios.get(`getUser/${getIdToken()}`, 
              { headers: 
                { Authorization: `Bearer ${getAccessToken()}`}
              })
         .then(response => console.log(response.data));
  }
}