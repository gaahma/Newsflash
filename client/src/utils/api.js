import axios from 'axios';
import {getAccessToken, getIdToken} from './AuthService';

function getHeader(){
  return { headers: 
    { Authorization: `Bearer ${getAccessToken()}`}
   }
}


export default {
  test(){
    axios.get("/authorized", getHeader())
         .then(response => console.log(response.data));
         
  },
  getUser(){
    return axios.get(`/getUser/${getIdToken()}`, getHeader());
        //  .then(response => console.log(response.data));
  },
  userReadArticle(){
    return axios.put(`/userReadArticle/${getIdToken()}`,{}, getHeader());
  },
  userLoggedIn(){  //should be using axios.put
    return axios.post(`/userLoggedIn`,{id: getIdToken()}, getHeader());
  },
  frontPage(){
    return axios.get('/frontPage', getHeader());
         //.then(response => response.data);
  },
  categoryPage(href){
    return axios.get(href, getHeader());
  },

  getArticle(link){
    return axios.request({
      method: 'get',
      url: "/getArticle",
      headers: { Authorization: `Bearer ${getAccessToken()}`,
                 link: link,  // it's practically impossible to send a url string to the server as a url param,
                              // so I packaged it in the headers instead.  
               }
    });
  },

  updateSettings(settings){
    return axios.put(`/updateSettings/${settings._id}`, {settings: settings}, getHeader());
  }
}