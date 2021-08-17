import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { arrayOf, string } from 'prop-types';
import {
  Select, MenuItem, InputLabel, Chip, FormControl, makeStyles,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { addSelectedMetric, removeSelectedMetric } from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 755,
    marginTop: theme.spacing(2),
  },
}));

const MetricsSelect = ({ options }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedMetrics } = useSelector((state) => state.metrics);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const metricOptions = options.filter((option) => !selectedMetrics.includes(option));

  useEffect(() => {
    if (!metricOptions.length && isSelectOpen) {
      setIsSelectOpen(false);
    }
  }, [selectedMetrics, metricOptions, isSelectOpen]);

  const handleChange = (e) => {
    // last string in e.target.value array will be the added metric
    const addedMetric = e.target.value[e.target.value.length - 1];

    if (addedMetric && !selectedMetrics.includes(addedMetric)) {
      dispatch(addSelectedMetric(addedMetric));
    }
  };

  const handleOnDelete = (_, value) => {
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
            {selected.map((value) => (
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

MetricsSelect.propTypes = {
  options: arrayOf(string),
};

export default MetricsSelect;
