'use client';

import type { WebGLRenderer } from 'three';
import { useThree } from '@react-three/fiber';

export const useGl = (): WebGLRenderer => useThree((three) => three.gl);
