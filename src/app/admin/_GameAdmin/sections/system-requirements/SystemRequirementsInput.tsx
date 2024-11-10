// Types
import type { ChangeEvent, RefObject } from 'react';

interface SystemRequirementsInputProps {
  label: 'OS' | 'CPU' | 'RAM' | 'GPU' | 'DX' | 'NETWORK' | 'STORAGE' | 'SOUNDCARD' | 'VR SUPPORT';
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
}

export default function SystemRequirementsInput({
  label,
  value,
  handleChange,
  inputRef,
}: SystemRequirementsInputProps) {
  return (
    <div className="form-field">
      <label className="field-label">{label}:</label>
      <input
        type="text"
        className="field-input"
        value={value}
        onChange={(e) => handleChange(e)}
        ref={inputRef}
      />
    </div>
  );
}
