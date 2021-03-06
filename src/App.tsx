import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Metrics from './Features/Metrics';

import store from './store';
import graphQLClient from './graphql/client';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
  spacing: 8,
});

const App: FC = () => (
  <Provider store={store}>
    <ApolloProvider client={graphQLClient}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Wrapper>
          <Header />
          <Metrics />
          <ToastContainer position="bottom-center" />
        </Wrapper>
      </MuiThemeProvider>
    </ApolloProvider>
  </Provider>
);

export default App;
