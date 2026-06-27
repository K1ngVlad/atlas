import { Mesh, MeshStandardMaterial, type Object3D } from 'three';

import { ORGAN_MAP_BY_MODEL_NAME, SYSTEM_MAP_BY_MODEL_NAME } from '@/configs';

class ModelRenderService {
  private static instance: ModelRenderService;

  private readonly HIGHLIGHT_COLOR = 0x32cd32;
  private readonly HIGHLIGHT_INTENSITY = 0.5;

  private readonly clonedMaterials = new WeakMap<Mesh, MeshStandardMaterial>();
  private readonly originalEmissives = new WeakMap<
    MeshStandardMaterial,
    { color: number; intensity: number }
  >();

  private constructor() {}

  public static getInstance(): ModelRenderService {
    if (!ModelRenderService.instance) {
      ModelRenderService.instance = new ModelRenderService();
    }
    return ModelRenderService.instance;
  }

  public applyVisibility(scene: Object3D, selectedSystems: string[]) {
    const rootObject = scene.children[0];
    if (!rootObject) return;

    rootObject.children.forEach((child) => {
      if (
        child.type === 'Object3D' &&
        SYSTEM_MAP_BY_MODEL_NAME.has(child.name)
      ) {
        const systemConfig = SYSTEM_MAP_BY_MODEL_NAME.get(child.name);
        if (systemConfig) {
          const visible = selectedSystems.includes(systemConfig.modelName);
          child.visible = visible;
          child.traverse((obj) => {
            if (obj instanceof Mesh) {
              if (visible) {
                obj.raycast = Mesh.prototype.raycast;
              } else {
                obj.raycast = () => {};
              }
            }
          });
        }
      }
    });
  }

  private getOrCreateMutableMaterial(mesh: Mesh): MeshStandardMaterial | null {
    if (
      Array.isArray(mesh.material) ||
      !(mesh.material instanceof MeshStandardMaterial)
    ) {
      return null;
    }

    if (!this.clonedMaterials.has(mesh)) {
      const src = mesh.material;
      const clone = src.clone();
      this.originalEmissives.set(clone, {
        color: src.emissive.getHex(),
        intensity: src.emissiveIntensity,
      });
      mesh.material = clone;
      this.clonedMaterials.set(mesh, clone);
    }

    return this.clonedMaterials.get(mesh)!;
  }

  public applyOrganHighlight(
    scene: Object3D,
    organName: string,
    highlighted: boolean,
  ) {
    const organNode = scene.getObjectByName(organName);
    if (!organNode) return;

    organNode.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      const mat = this.getOrCreateMutableMaterial(child);
      if (!mat) return;

      if (highlighted) {
        mat.emissive.set(this.HIGHLIGHT_COLOR);
        mat.emissiveIntensity = this.HIGHLIGHT_INTENSITY;
      } else {
        const orig = this.originalEmissives.get(mat);
        if (orig) {
          mat.emissive.setHex(orig.color);
          mat.emissiveIntensity = orig.intensity;
        }
      }
    });
  }

  public findOrganName(object: Object3D): string | null {
    let current: Object3D | null = object;
    while (current) {
      if (ORGAN_MAP_BY_MODEL_NAME.has(current.name)) return current.name;
      current = current.parent;
    }
    return null;
  }
}

export const modelRenderService = ModelRenderService.getInstance();
