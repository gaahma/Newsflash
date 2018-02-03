import axios from 'axios';
import {getAccessToken, getIdToken} from './AuthService';
const headers = { headers: 
                 { Authorization: `Bearer ${getAccessToken()}`}
                }


export default {
  test(){
    axios.get("/authorized", headers)
         .then(response => console.log(response.data));
  },
  getUser(){
    axios.get(`/getUser/${getIdToken()}`,headers)
         .then(response => console.log(response.data));
  },
  frontPage(){
    return axios.get('/frontPage', headers);
         //.then(response => response.data);
  }
}