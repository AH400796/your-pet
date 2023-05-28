import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import, set type ('error', 'warning', 'success', 'info')
// and text: notify('success', 'You have successfully logged in');

export const notify = (type, text) => {
  const toastConfig = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };
  switch (type) {
    case 'error':
      toast.error(text, toastConfig);
      break;
    case 'warning':
      toast.warn(text, toastConfig);
      break;
    case 'success':
      toast.success(text, toastConfig);
      break;
    case 'info':
      toast.info(text, toastConfig);
      break;
    default:
      toast(text, toastConfig);
  }
};
