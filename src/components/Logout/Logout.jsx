import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut, userCurrent } from 'redux/auth/authService';
import { ModalApproveAction } from 'components/ModalApproveAction/ModalApproveAction';

import { LogOut } from '../buttons/buttons';

export const Logout = () => {
  const [isLogOut, setIsLogOut] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userCurrent());
  }, [dispatch]);

  const handleLogOut = () => {
    setIsLogOut(true);
  };

  const handleLogOutCancel = () => {
    setIsLogOut(false);
  };

  const handleLogOutYes = async () => {
    try {
      dispatch(logOut());
      setIsLogOut(false);
      navigate('/');
    } catch (error) {}
  };

  return (
    <>
      <LogOut onClick={handleLogOut} />

      {isLogOut && (
        <ModalApproveAction
          onActivate={handleLogOutYes}
          onClick={handleLogOutCancel}
          variant={'logOut'}
        /> 
      )}
    </>
  );
};
