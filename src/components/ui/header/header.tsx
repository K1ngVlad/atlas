'use client';

import type { FC, SubmitEvent } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

import styles from './header.module.scss';
import { useAtom, useSetAtom } from 'jotai';
import { foundOrgansAtom, searchTextAtom, viewModeAtom } from '@/storage';
import { SearchIcon } from '../icons';
import { ORGAN_CONFIGS } from '@/configs';
import { ViewMode } from '@/types';

export const Header: FC = () => {
  const [searchText, setSearhText] = useAtom(searchTextAtom);
  const setFoundOrgans = useSetAtom(foundOrgansAtom);
  const setViewMode = useSetAtom(viewModeAtom);

  const submitHandler = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const foundOrgans = ORGAN_CONFIGS.filter((organ) => {
      const organName = organ.name.trim().toLocaleLowerCase();
      const organDescription = organ.name.trim().toLocaleLowerCase();

      const searchWords = searchText.trim().toLocaleLowerCase().split(' ');

      return searchWords.every(
        (word) => organName.includes(word) || organDescription.includes(word),
      );
    }).map((organ) => organ.modelName);

    setFoundOrgans(foundOrgans);
    setViewMode(ViewMode.ORANS_SEARCH);
  };

  return (
    <Box component="header" className={styles.header}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        Динамический атлас
      </Typography>
      <form onSubmit={submitHandler}>
        <TextField
          className={styles.field}
          label="Поиск органов"
          value={searchText}
          onChange={(event) => setSearhText(event.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </form>
    </Box>
  );
};
