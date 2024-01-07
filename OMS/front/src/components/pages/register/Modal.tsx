
import { useState } from 'react';
import Header from '../dashboard/Header';
import SignUp from './SignUP';

const SuperHeader = () => {
  const [openSignUp, setOpenSignUp] = useState(false);

  const openPopUp = () => {
    setOpenSignUp(true);
  };

  const closePopUp = () => {
    setOpenSignUp(false);
  };

  return (
    <div>
      <Header openSignUp={openPopUp} />
      <SignUp
        open={openSignUp} handleClose={closePopUp} />
    </div>
  );
};

export default SuperHeader;

