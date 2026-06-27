'use client';

import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from '@mui/material';

import { MultipleSelectChip } from '../multiple-select-chip';

import styles from './sidebar.module.scss';
import {
  ORGAN_MAP_BY_MODEL_NAME,
  SYSTEM_MAP_BY_MODEL_NAME,
  SYSTEM_OPTIONS,
} from '@/configs';
import { useAtom, useAtomValue } from 'jotai';
import {
  foundOrgansAtom,
  selectedOrganAtom,
  selectedSystemsAtom,
  viewModeAtom,
} from '@/storage';
import { ViewMode } from '@/types';
import { Fragment } from 'react/jsx-runtime';
import { OrganIcon } from '../icons';

export const Sidebar = () => {
  const [selectedSystems, setSelectedSystems] = useAtom(selectedSystemsAtom);
  const [selectedOrgan, setSelectedOrgan] = useAtom(selectedOrganAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const foundOrgans = useAtomValue(foundOrgansAtom);

  const renderContent = () => {
    if (viewMode === ViewMode.ORGAN_INFO && selectedOrgan) {
      const organ = ORGAN_MAP_BY_MODEL_NAME.get(selectedOrgan);

      if (organ) {
        const system = SYSTEM_MAP_BY_MODEL_NAME.get(organ.systemName);

        return (
          <>
            <Typography variant="h4">{organ.name}</Typography>
            <Typography
              sx={{
                opacity: 0.6,
              }}
              variant="subtitle1"
            >
              {system?.name || 'Без системы'}
            </Typography>
            <Typography
              sx={{
                marginTop: '16px',
              }}
              variant="body1"
            >
              {organ.description}
            </Typography>
          </>
        );
      }
    }

    if (viewMode === ViewMode.ORANS_SEARCH) {
      if (foundOrgans.length) {
        return (
          <>
            <Typography variant="h4">Результаты поиска</Typography>
            <List>
              {foundOrgans.map((organModelName, index) => {
                const organ = ORGAN_MAP_BY_MODEL_NAME.get(organModelName);

                if (organ) {
                  return (
                    <Fragment key={organModelName}>
                      {index > 0 && <Divider />}
                      <ListItem>
                        <ListItemButton
                          onClick={() => {
                            setSelectedOrgan(organModelName);
                            setViewMode(ViewMode.ORGAN_INFO);
                            setSelectedSystems((systems) => {
                              if (systems.includes(organ.systemName))
                                return systems;
                              return [...systems, organ.systemName];
                            });
                          }}
                        >
                          <ListItemIcon>
                            <OrganIcon />
                          </ListItemIcon>
                          {organ.name}
                        </ListItemButton>
                      </ListItem>
                    </Fragment>
                  );
                }

                return (
                  <Fragment key={organModelName}>
                    {index > 0 && <Divider />}
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          setSelectedOrgan(organModelName);
                          setViewMode(ViewMode.ORGAN_INFO);
                        }}
                      >
                        Неизвестный орган
                      </ListItemButton>
                    </ListItem>
                  </Fragment>
                );
              })}
            </List>
          </>
        );
      }
      return (
        <Typography>По вашему запросу не было найдено органов.</Typography>
      );
    }

    return (
      <>
        <Typography variant="h4">Динамический атлас</Typography>
        <Typography variant="subtitle1">
          Добро пожаловать в атлас! Нажмите на орган, который вас интересует,
          чтобы увидеть информацию по нему
        </Typography>
      </>
    );
  };

  return (
    <Box component="aside" className={styles.sidebar}>
      <div className={styles.mainContent}>{renderContent()}</div>
      <div className={styles.systemsSelect}>
        <Typography variant="h5">Настройки</Typography>
        <MultipleSelectChip
          label="Отображаемые системы"
          onChange={(event) => {
            if (Array.isArray(event.target.value)) {
              setSelectedSystems(event.target.value);
            }
          }}
          options={SYSTEM_OPTIONS}
          values={selectedSystems}
        />
      </div>
    </Box>
  );
};
