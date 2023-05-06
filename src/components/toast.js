/* import Toast from 'react-native-toast-message';

export const showToast = (message) => {

    Toast.show({
        type: 'error',
        text1: message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
    });
};
 */

import Toast from 'react-native-toast-message';

class ToastClass {
    success(message) {
      Toast.show({
        type: 'success',
        text1: message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }
  
    error(message) {
      Toast.show({
        type: 'error',
        text1: message,
        position: 'bottom',
      });
    }
  
    info(message) {
      Toast.show({
        type: 'info',
        text1: message,
        position: 'bottom',
      });
    }
  }

  export default new ToastClass();