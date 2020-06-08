import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { FirebaseHOC } from '../firebase/Context';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const SignOutDialog = ({ firebaseRef }) => {
  const [open, setOpen] = React.useState(true);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    firebaseRef.signOut();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Sign Out</DialogTitle>
      <DialogContent>
        <Typography variant={'caption'}>Do you want to sign out?</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SignOutDialog.propTypes = {
  firebaseRef: PropTypes.func.isRequired,
};

export default FirebaseHOC(SignOutDialog);
