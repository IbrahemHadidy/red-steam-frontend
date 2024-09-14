import type { ChangeEvent, FC, JSX, RefObject } from 'react';
import type { SystemRequirements } from '../create-game.entity';
interface SystemRequirementsProps {
  systemRequirements: SystemRequirements;
  setSystemRequirements: (systemRequirements: SystemRequirements) => void;
  miniOsRef: RefObject<HTMLInputElement>;
  miniCpuRef: RefObject<HTMLInputElement>;
  miniRamRef: RefObject<HTMLInputElement>;
  miniGpuRef: RefObject<HTMLInputElement>;
  miniStorageRef: RefObject<HTMLInputElement>;
  recommendedOsRef: RefObject<HTMLInputElement>;
  recommendedCpuRef: RefObject<HTMLInputElement>;
  recommendedRamRef: RefObject<HTMLInputElement>;
  recommendedGpuRef: RefObject<HTMLInputElement>;
  recommendedStorageRef: RefObject<HTMLInputElement>;
}

const SystemRequirements: FC<SystemRequirementsProps> = ({
  systemRequirements,
  setSystemRequirements,
  miniOsRef,
  miniCpuRef,
  miniRamRef,
  miniGpuRef,
  miniStorageRef,
  recommendedOsRef,
  recommendedCpuRef,
  recommendedRamRef,
  recommendedGpuRef,
  recommendedStorageRef,
}): JSX.Element => {
  // System requirements keys
  const requirementsKeys: string[] = [
    'os',
    'cpu',
    'ram',
    'gpu',
    'dx',
    'network',
    'storage',
    'soundCard',
    'vrSupport',
  ];

  // Generic handler for input changes
  const handleChange =
    (section: 'mini' | 'recommended', key: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setSystemRequirements({
        ...systemRequirements,
        [section]: {
          ...systemRequirements[section],
          [key]: e.target.value,
        },
      });
    };

  // Event handlers
  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSystemRequirements({
      ...systemRequirements,
      req64: e.target.checked,
    });
  };

  // Utility functions
  const handleCamelCase = (str: string): string => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace('Os', 'OS')
      .replace('Cpu', 'CPU')
      .replace('Ram', 'RAM')
      .replace('Gpu', 'GPU')
      .replace('Dx', 'DX')
      .replace('Vr', 'VR');
  };

  // Function to get the ref for a specific input field
  const getRef = (
    section: 'mini' | 'recommended',
    key: string
  ): RefObject<HTMLInputElement> | undefined => {
    if (section === 'mini') {
      switch (key) {
        case 'os':
          return miniOsRef;
        case 'cpu':
          return miniCpuRef;
        case 'ram':
          return miniRamRef;
        case 'gpu':
          return miniGpuRef;
        case 'storage':
          return miniStorageRef;
        default:
          return undefined;
      }
    } else if (section === 'recommended') {
      switch (key) {
        case 'os':
          return recommendedOsRef;
        case 'cpu':
          return recommendedCpuRef;
        case 'ram':
          return recommendedRamRef;
        case 'gpu':
          return recommendedGpuRef;
        case 'storage':
          return recommendedStorageRef;
        default:
          return undefined;
      }
    }
    return undefined;
  };

  return (
    <section className="section-system-requirements">
      <h2>System Requirements</h2>
      <div className="form-field form-field-checkbox">
        <label className="field-label-checkbox">64-bit Operating System Required:</label>
        <input
          type="checkbox"
          className="field-checkbox"
          checked={systemRequirements.req64}
          onChange={handleCheckboxChange}
        />
      </div>

      <div>
        <div className="form-field">
          <div className="form-row">
            <label className="field-label">Minimum</label>
            <p>OS, CPU, RAM, GPU, Storage are required</p>
          </div>

          {requirementsKeys.map((key) => (
            <div className="form-field" key={key}>
              <label className="field-label">{handleCamelCase(key)}:</label>
              <input
                type="text"
                className="field-input"
                value={systemRequirements.mini[key as keyof typeof systemRequirements.mini]}
                onChange={handleChange('mini', key)}
                ref={getRef('mini', key)}
              />
            </div>
          ))}

          <div className="form-field">
            <label className="field-label">Additional Notes:</label>
            <textarea
              className="field-input"
              value={systemRequirements.mini.additionalNotes}
              onChange={handleChange('mini', 'additionalNotes')}
            />
          </div>
        </div>

        <div className="form-field">
          <div className="form-row">
            <label className="field-label">Recommended</label>
            <p>OS, CPU, RAM, GPU, Storage are required</p>
          </div>

          {requirementsKeys.map((key) => (
            <div className="form-field" key={key}>
              <label className="field-label">{handleCamelCase(key)}:</label>
              <input
                type="text"
                className="field-input"
                value={
                  systemRequirements.recommended[key as keyof typeof systemRequirements.recommended]
                }
                onChange={handleChange('recommended', key)}
                ref={getRef('recommended', key)}
              />
            </div>
          ))}

          <div className="form-field">
            <label className="field-label">Additional Notes:</label>
            <textarea
              className="field-input"
              value={systemRequirements.recommended.additionalNotes}
              onChange={handleChange('recommended', 'additionalNotes')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SystemRequirements;
