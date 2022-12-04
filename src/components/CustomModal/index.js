import './styles.css';
import { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0.5px solid #abc',
  borderRadius: '5px',
  boxShadow: 0,
  p: 4,
};

export const CustomModal = (props) => {

    const { open, handleClose, data, title } = props; 

  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className='custom-modal'>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
        <Box id="modal-modal-description">
          {data && data()}
        </Box>
      </Box>
    </Modal>
  );
}