import { SelectChangeEvent } from '@mui/material';

export type MultipleSelectChipProps = {
  options: {
    label: string;
    value: string;
  }[];
  values: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
  label: string;
};
