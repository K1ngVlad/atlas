import { type OrbitControls, type TransformControls } from 'three/addons';
import { type ThreeElement, type ThreeElements } from '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: ThreeElement<typeof OrbitControls>;
    transformControls: ThreeElement<typeof TransformControls>;
  }
}
