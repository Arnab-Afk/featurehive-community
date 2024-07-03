import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../store/store';


function CallBackGoogle() {
  // Using the useLocation hook to get the current location
  const location = useLocation();
  const navigate=useNavigate();
  

  // Accessing query parameters from location.search
  const queryParams = new URLSearchParams(location.search);
  const callbackValue = queryParams.get('callback');
  const gimg = queryParams.get('gimg');
  const setIsUserLoggedIn = useStore((state) => state.setIsUserLoggedIn);

  useEffect(() => {
    localStorage.setItem('user-token',callbackValue)
    localStorage.setItem('gimg',gimg)
    const setCookie = (name, value, hours) => {
      const date = new Date();
      date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = `${name}=${value};${expires};path=/`;
    };

    setCookie('auth-token', callbackVajue, 1);
    setIsUserLoggedIn(true);
    navigate('/')
  }, [callbackValue, navigate])

  return (
    <></>
  );
}

export default CallBackGoogle;
