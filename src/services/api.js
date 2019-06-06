import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: 'http://192.168.100.7:3000'
});

export default api;
