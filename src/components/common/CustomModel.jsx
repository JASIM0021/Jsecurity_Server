import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react'

const CustomModel = ({title,open,setOpen,children}) => {
  const onClouse = () =>setOpen(false);
  return (
    <Dialog  open={open}  maxWidth="md"  onClose={onclose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
       {children}
      </DialogContent>
    <DialogActions>
    <Button onClick={onClouse} color="primary">
          Close
        </Button>
    </DialogActions>
   
  </Dialog>

  )
}

export default CustomModel