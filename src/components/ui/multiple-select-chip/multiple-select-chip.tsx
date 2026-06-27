import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { MultipleSelectChipProps } from './types';
import { SYSTEM_MAP_BY_MODEL_NAME } from '@/configs';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function getStyles(
  name: string,
  values: readonly (string | number)[],
  theme: Theme,
) {
  return {
    fontWeight: values.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export const MultipleSelectChip: React.FC<MultipleSelectChipProps> = (
  props,
) => {
  const { options, values, onChange, label } = props;

  const theme = useTheme();

  return (
    <div>
      <FormControl
        sx={{
          width: '100%',
        }}
        id="organ-select"
      >
        <InputLabel id="organ-select">{label}</InputLabel>
        <Select
          multiple
          id="organ-select"
          name="organ-select"
          onChange={onChange}
          value={values}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={SYSTEM_MAP_BY_MODEL_NAME.get(value)?.name ?? ''}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              style={getStyles(option.label, values, theme)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
