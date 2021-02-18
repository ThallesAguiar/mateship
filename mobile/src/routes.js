import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Register from './pages/Register';
import RegisterMerchant from './pages/RegisterMerchant';
import Main from './pages/Main';
import Map from './pages/Map';

const Routes = createAppContainer(
  createStackNavigator({
    RegisterMerchant,
    Login,
    Register,
    Main,
    Map
  }, {
    defaultNavigationOptions: {
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'teal',
      },
      headerTintColor: '#FFF',
    }
  })
);

export default Routes;