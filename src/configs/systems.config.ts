import { SystemConfig } from '@/types';

export const SYSTEM_CONFIGS: SystemConfig[] = [
  {
    modelName: 'VH_M_skeletal_system',
    name: 'Скелетная система',
    color: '#F4A460',
    icon: '🦴',
    isVisibleByDefault: true,
  },
  {
    modelName: 'VH_M_muscular_system',
    name: 'Мышечная система',
    color: '#CD5C5C',
    icon: '💪',
    isVisibleByDefault: true,
  },
  {
    modelName: 'VH_M_circulatory_system',
    name: 'Кровеносная система',
    color: '#DC143C',
    icon: '❤️',
    isVisibleByDefault: false,
  },
  {
    modelName: 'VH_M_nervous_system',
    name: 'Нервная система',
    color: '#FFD700',
    icon: '🧠',
    isVisibleByDefault: true,
  },
  {
    modelName: 'VH_M_digestive_system',
    name: 'Пищеварительная система',
    color: '#32CD32',
    icon: '🍽️',
    isVisibleByDefault: false,
  },
  {
    modelName: 'VH_M_respiratory_system',
    name: 'Дыхательная система',
    color: '#87CEEB',
    icon: '🫁',
    isVisibleByDefault: false,
  },
  {
    modelName: 'VH_M_urinary_system',
    name: 'Мочеполовая система',
    color: '#9370DB',
    icon: '🧫',
    isVisibleByDefault: false,
  },
  {
    modelName: 'VH_M_lymphatic_system',
    name: 'Лимфатическая система',
    color: '#20B2AA',
    icon: '💧',
    isVisibleByDefault: false,
  },
  {
    modelName: 'VH_M_integumentary_system',
    name: 'Покровная система',
    color: '#D2B48C',
    icon: '🧴',
    isVisibleByDefault: false,
  },
  {
    modelName: 'VH_M_male_reproductive_system',
    name: 'Репродуктивная система',
    color: '#FF69B4',
    icon: '👶',
    isVisibleByDefault: false,
  },
];

export const SYSTEM_MAP_BY_MODEL_NAME = new Map(
  SYSTEM_CONFIGS.map((config) => [config.modelName, config]),
);

export const SYSTEM_OPTIONS = SYSTEM_CONFIGS.map((config) => ({
  value: config.modelName,
  label: [config.name, config.icon].filter(Boolean).join(' '),
}));
