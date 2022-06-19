
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//Not sure where this is going to be placed yet. We'll discuss this thursday

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Instructions = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{padding: '1.5rem'}}>
            <div>
                <Button onClick={handleOpen}>How To Use Visualizer</Button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="instruction" variant="h6" component="h2">
                        Instruction
                        </Typography>
                        <Typography id="instruction-text" sx={{ mt: 2 }}>
                        Press the A key to increase the speed of the diamonds.
                        </Typography>
                        <Typography id="instruction-text" sx={{ mt: 2 }}>
                        Press the S key to increase the speed of the diamonds.
                        </Typography>
                        <Typography id="instruction-text" sx={{ mt: 2 }}>
                        Press the W key to rotate the direction of diamonds.
                        </Typography>
                        <Typography id="instruction-text" sx={{ mt: 2 }}>
                        Press the Enter key to cycle through our color pallettes of diamonds.
                        </Typography>
                    </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    )
}

export default Instructions

