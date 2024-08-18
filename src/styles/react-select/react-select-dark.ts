import type { StylesConfig } from 'react-select';

const defaultDarkStyles: StylesConfig<{ value: number; label: string }> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#282c34',
    borderColor: '#555',
    color: '#fff',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#282c34',
    borderColor: '#555',
    color: '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#555' : '#282c34',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#444',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#444',
    color: '#fff',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#aaa',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  input: (provided) => ({
    ...provided,
    color: '#fff',
  }),
};

export default defaultDarkStyles;
