import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Footer from '../layout/Footer';
import { FirebaseHOC } from '../firebase/Context';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUpForm = ({ firebaseRef }) => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [signUpButtonLabel, setSignUpButtonLabel] = React.useState('Request');
  const [phoneNumberReadOnly, setPhoneNumberReadOnly] = React.useState(false);
  const [confirmationResult, setConfirmationResult] = React.useState(null);
  const recaptchaContainerRef = React.useRef(null);
  let applicationVerifier;

  setTimeout(() => {
    // 'sign-up' is the ID of the button that submits your sign-up form.
    applicationVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
      }
    );
  }, 1000);

  const onSubmit = (data) => {
    if (confirmationResult) {
      confirmationResult
        .confirm(data.verificationCode)
        .then((userCredential) => {
          console.log(
            'User is successfully authenticated with credentials: ' +
              userCredential.user.toJSON()
          );
        })
        .catch((error) => {
          console.log('Error occurred while validating OTP: ', error);
          if (error.code === 'auth/invalid-verification-code')
            error.message = 'Invalid OTP';
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    } else {
      firebaseRef
        .signIn('+91' + data.phoneNumber, applicationVerifier)
        .then((confirmResult) => {
          setConfirmationResult(confirmResult);
          setPhoneNumberReadOnly(true);
          setSignUpButtonLabel('Verify');
          enqueueSnackbar('OTP has been sent to ' + data.phoneNumber, {
            variant: 'info',
          });
        })
        .catch((error) => {
          console.log('Error occurred while sending OTP: ', error);
          applicationVerifier.clear();
          recaptchaContainerRef.current.innerHTML =
            '<div id="recaptcha-container" />';
          enqueueSnackbar(error.message, { variant: 'error' });
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="phoneNumber"
              label="Enter 10 digit Mobile Number"
              type="number"
              id="phoneNumber"
              inputProps={{
                readOnly: phoneNumberReadOnly,
              }}
              inputRef={register({
                required: 'Phone Number is required',
                minLength: { value: 10, message: 'minimum 10 digits required' },
                maxLength: { value: 10, message: 'maximum 10 digits allowed' },
              })}
              error={!!errors.phoneNumber}
              helperText={errors?.phoneNumber?.message}
            />
          </Grid>
          {phoneNumberReadOnly ? (
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="verificationCode"
                label="Enter 6 digit OTP"
                type="number"
                id="verificationCode"
                inputRef={register({
                  required: 'Verification code is required',
                  minLength: { value: 6, message: 'minimum 6 digits required' },
                  maxLength: { value: 6, message: 'maximum 6 digits allowed' },
                })}
                error={!!errors.verificationCode}
                helperText={errors?.verificationCode?.message}
              />
            </Grid>
          ) : (
            <Grid />
          )}
        </Grid>
        <Button
          id="sign-up"
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          className={classes.submit}
          startIcon={<SmartphoneIcon />}
        >
          {signUpButtonLabel} OTP
        </Button>
      </form>
      <div ref={recaptchaContainerRef}>
        <div id="recaptcha-container" />
      </div>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        className={classes.submit}
        component={Link}
        to="/"
      >
        Close
      </Button>
    </Container>
  );
};

SignUpForm.propTypes = {
  firebaseRef: PropTypes.func.isRequired,
};

const SignUp = ({ firebaseRef }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div id="sign-up-page" className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          MyExpense
        </Typography>
        <SignUpForm firebaseRef={firebaseRef} />
      </div>
      <Footer />
    </Container>
  );
};

SignUp.propTypes = {
  firebaseRef: PropTypes.func.isRequired,
};

export default FirebaseHOC(SignUp);
