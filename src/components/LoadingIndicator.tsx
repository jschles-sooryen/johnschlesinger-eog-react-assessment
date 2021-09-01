import React, { FC } from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

const LoadingIndicator: FC = () => (
  <Grid
    container
    alignItems="center"
    justifyContent="center"
  >
    <Grid item>
      <CircularProgress />
    </Grid>
  </Grid>
);

export default LoadingIndicator;
