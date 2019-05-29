import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: 'http://192.168.100.2:3000' || 'http://10.0.2.2:3000'
});

export default api;
