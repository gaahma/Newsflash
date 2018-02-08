import axios from 'axios';
import {getAccessToken, getIdToken} from './AuthService';
const headers = { headers: 
                 { Authorization: `Bearer ${getAccessToken()}`}
                }
function getHeader(){
  return { headers: 
    { Authorization: `Bearer ${getAccessToken()}`}
   }
}


export default {
  test(){
    axios.get("/authorized", 
      { headers: 
        { Authorization: `Bearer ${getAccessToken()}`}
      }
    ).then(response => console.log(response.data));
         
  },
  getUser(){
    axios.get(`/getUser/${getIdToken()}`, 
      { headers: 
        { Authorization: `Bearer ${getAccessToken()}`}
      }
    ).then(response => console.log(response.data));
  },
  frontPage(){
    return axios.get('/frontPage', 
      { headers: 
        { Authorization: `Bearer ${getAccessToken()}`}
      });
         //.then(response => response.data);
  },
  categoryPage(href){
    return axios.get(href, getHeader());
  }
}