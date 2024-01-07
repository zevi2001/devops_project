import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Popover, Typography, useTheme } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditUser from '../../pages/EditUser/EditUser';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../../services/users.service';
import Modal from '../../Templates/Modal';

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const Navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  const [editUserOpen, setEditUserOpen] = useState(false);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleEditProfile = () => {
    setEditUserOpen(true);
    handleCloseMenu();
  };

  const handleDeleteAccount = async () => {
      deleteAccount(handleOpenModal)
       handleCloseMenu()
    };


  const handleLogout = () => {
    localStorage.removeItem('username');
    Navigate('/banner/');
  };

  const handleCloseEditUser = () => {
    setEditUserOpen(false);
  };

  const handleOpenModal = (message: string) => {
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    Navigate('/banner/');
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu} sx={{ color: 'inherit' }}>
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEditProfile}>
          <EditIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="body1">Edit Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteAccount}>
          <DeleteIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="body1">Delete Account</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ marginRight: theme.spacing(1) }} />
          <Typography variant="body1">Logout</Typography>
        </MenuItem>
      </Menu>
      <Popover
        open={editUserOpen}
        anchorEl={anchorEl}
        onClose={handleCloseEditUser}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <EditUser />
        </Box>
      </Popover>
      <Modal
        open={modalOpen}
        message={modalMessage}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default UserProfile
