'use client';

import type { Camera } from 'three';
import { useThree } from '@react-three/fiber';

export const useCamera = (): Camera => useThree((three) => three.camera);
