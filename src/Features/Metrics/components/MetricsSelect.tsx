import React, { ChangeEvent, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Select, MenuItem, InputLabel, Chip, FormControl, makeStyles,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { addSelectedMetric, removeSelectedMetric } from '../../../store/actions';

import { RootState } from '../../../store';
import { MetricSelectProps } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 755,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

const metricsState = (state: RootState) => state.metrics;

const MetricsSelect: FC<MetricSelectProps> = ({ options }: MetricSelectProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedMetrics } = useSelector(metricsState);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const metricOptions = (
    (options && options.filter((option: string) => !selectedMetrics.includes(option))) || []
  );

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    // last string in e.target.value array will be the added metric
    const target = (event.target as HTMLInputElement);
    const addedMetric = target.value[target.value.length - 1];

    if (addedMetric && !selectedMetrics.includes(addedMetric)) {
      dispatch(addSelectedMetric(addedMetric));
    }

    setIsSelectOpen(false);
  };

  const handleOnDelete = (_: ChangeEvent, value: string) => {
    dispatch(removeSelectedMetric(value));
  };

  const handleOpen = () => {
    setIsSelectOpen(true);
  };

  const handleClose = () => {
    setIsSelectOpen(false);
  };

  return (
    <FormControl classes={{ root: classes.root }}>
      <InputLabel id="metrics-select">Select Metric(s)</InputLabel>
      <Select
        labelId="metrics-select"
        multiple
        open={isSelectOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        value={selectedMetrics}
        onChange={handleChange}
        disabled={!metricOptions.length}
        renderValue={(selected) => (
          <div>
            {(selected as string[]).map((value: any) => (
              <Chip
                key={value}
                label={value}
                deleteIcon={<Cancel onMouseDown={(e) => e.stopPropagation()} />}
                onDelete={(e) => handleOnDelete(e, value)}
              />
            ))}
          </div>
        )}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        {metricOptions.map((option) => (
          <MenuItem value={option} key={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MetricsSelect;
