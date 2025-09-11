import {
  FaRuler,
  FaWeight,
  FaPalette,
  FaEye,
  FaBirthdayCake,
  FaVenusMars,
} from 'react-icons/fa';
import type { CharacterField } from '../CharacterDetails.types';

export const characterFields: CharacterField[] = [
  { key: 'height', label: 'Height', icon: <FaRuler />, suffix: ' cm' },
  { key: 'mass', label: 'Mass', icon: <FaWeight />, suffix: ' kg' },
  {
    key: 'hair_color',
    label: 'Hair Color',
    icon: <FaPalette />,
    colorBox: true,
  },
  {
    key: 'skin_color',
    label: 'Skin Color',
    icon: <FaPalette />,
    colorBox: true,
  },
  { key: 'eye_color', label: 'Eye Color', icon: <FaEye />, colorBox: true },
  { key: 'birth_year', label: 'Birth Year', icon: <FaBirthdayCake /> },
  { key: 'gender', label: 'Gender', icon: <FaVenusMars /> },
];
