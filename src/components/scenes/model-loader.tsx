'use client';

import type { FC } from 'react';
import { Html } from '@react-three/drei';
import { CircularProgress } from '@mui/material';

export const ModelLoader: FC = () => {
  return (
    <Html>
      <CircularProgress />
    </Html>
  );
};
