'use client';

import type { FC } from 'react';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { extend } from '@react-three/fiber';

import { useCamera, useGl } from '@/hooks';

extend({ OrbitControls });

export const Controls: FC = () => {
  const camera = useCamera();
  const gl = useGl();

  return <orbitControls args={[camera, gl.domElement]} />;
};
