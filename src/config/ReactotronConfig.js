import Reactotron from 'reactotron-react-native';
import Config from 'react-native-config';
import { reactotronRedux } from 'reactotron-redux';

const tron = Reactotron.configure({ host: Config.IPV4 || null })
  .useReactNative()
  .use(reactotronRedux())
  .connect();

tron.clear();

console.tron = tron;

export default tron;
