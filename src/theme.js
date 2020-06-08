import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
