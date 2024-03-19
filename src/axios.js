import axios from "axios";
import {BASE_URL} from './Constant/constant'

const instance = axios.create({
    baseURL: BASE_URL || process.env.REACT_APP_SERVER_URL,
     
  });

  export default instance;