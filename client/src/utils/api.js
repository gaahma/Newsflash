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
    axios.get(`/getUser/${getIdToken()}`, getHeader())
         .then(response => console.log(response.data));
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
                 link: link,
               }
    });
  }
}