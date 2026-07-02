import { toast, cssTransition } from 'react-toastify';

const CustomAnimation = cssTransition({
  enter: 'custom-toast-enter',
  exit: 'custom-toast-exit',
});

const defaultOptions = {
  position: 'top-right',
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
  transition: CustomAnimation
};

export const notifySuccess = (message) => toast.success(message, defaultOptions);
export const notifyError = (message) => toast.error(message, defaultOptions);
export const notifyWarning = (message) => toast.warning(message, defaultOptions);
export const notifyInfo = (message) => toast.info(message, defaultOptions);
