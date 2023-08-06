import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  weatherDisplay: {
    borderRadius: 44,
    marginBottom: '1rem',
    display: 'block',
    padding: '8px',
    maxWidth: '100%', // Set a maximum width of 100%
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    margin: 10,
  },
  maintitle: {
    fontSize: '6rem',
    font: 'Arial',
    color: '#16BFC5',
    margin: 0,
  },
  subtitle: {
    fontSize: '3rem',
    fontFamily: 'Libre Baskerville',
    color: '#BDBDBD',
    margin: 0,
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));