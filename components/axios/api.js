import axios from 'axios';
// const defaultURL = (process.env.NODE_ENV==="production") ? "https://newmasterconnect.herokuapp.com/api" :  "http://localhost:8000/api";
const defaultURL =  "https://newmasterconnect.herokuapp.com/api";
// const defaultURL =  "http://localhost:8000/api";

axios.defaults.baseURL = defaultURL;

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Accept'] = '*/*';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const api = axios.create({
    headers:{
        
        "Accept":'*/*',
        'Content-Type':'application/json',
        "Access-Control-Allow-Origin":"*"
        
        
    }
    
    

});

export default api