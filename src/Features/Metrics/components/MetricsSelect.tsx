import React, { ChangeEvent, useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import {
  Select, MenuItem, InputLabel, Chip, FormControl, makeStyles,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { addSelectedMetric, removeSelectedMetric } from '../../../store/actions';
import { MetricsSelectProps } from '../types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 755,
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  selectMenu: {
    [theme.breakpoints.down('xs')]: {
      whiteSpace: 'normal',
    },
  },
  chip: {
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0.5),
    },
  },
}));

const MetricsSelect: FC<MetricsSelectProps> = (
  { options, selectedMetrics }: MetricsSelectProps,
) => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
        classes={{ selectMenu: classes.selectMenu }}
        renderValue={(selected) => (
          <div>
            {(selected as string[]).map((value: any) => (
              <Chip
                classes={{ root: classes.chip }}
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
