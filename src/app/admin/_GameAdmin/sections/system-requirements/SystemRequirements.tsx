// React
import { useRef } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  toggleRequired64bit,
  updateMiniAdditionalNotes,
  updateMiniCPU,
  updateMiniDX,
  updateMiniGPU,
  updateMiniNetwork,
  updateMiniOS,
  updateMiniRAM,
  updateMiniSoundCard,
  updateMiniStorage,
  updateMiniVrSupport,
  updateRecommendedAdditionalNotes,
  updateRecommendedCPU,
  updateRecommendedDX,
  updateRecommendedGPU,
  updateRecommendedNetwork,
  updateRecommendedOS,
  updateRecommendedRAM,
  updateRecommendedSoundCard,
  updateRecommendedStorage,
  updateRecommendedVrSupport,
} from '@store/features/admin/game/gameAdminSlice';

// Components
import FormButtons from '../../FormButtons';
import SystemRequirementsInput from './SystemRequirementsInput';

// Form Validation
import { validateSystemRequirements } from '../../validations';

// Types
import type { UnknownAction } from '@reduxjs/toolkit';
import type { ChangeEvent, RefObject } from 'react';

export default function SystemRequirements() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { systemRequirements } = useAppSelector((state) => state.admin.game);

  //------------------------ Refs for File Inputs -------------------------//
  const miniOsRef = useRef<HTMLInputElement>(null);
  const miniCpuRef = useRef<HTMLInputElement>(null);
  const miniRamRef = useRef<HTMLInputElement>(null);
  const miniGpuRef = useRef<HTMLInputElement>(null);
  const recommendedOsRef = useRef<HTMLInputElement>(null);
  const recommendedCpuRef = useRef<HTMLInputElement>(null);
  const recommendedRamRef = useRef<HTMLInputElement>(null);
  const recommendedGpuRef = useRef<HTMLInputElement>(null);

  //-------------------------- Utility Functions --------------------------//
  // Generalized input change handler
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    actionCreator: (value: string) => UnknownAction
  ): void => {
    const value = e.target.value;
    dispatch(actionCreator(value));
  };

  // Event handlers
  const handleRequired64bitChange = (): void => {
    dispatch(toggleRequired64bit());
  };

  //-------------------------- Render UI Section --------------------------//
  // Render function for system requirements input fields
  const renderSystemRequirementInputs = (
    prefix: 'mini' | 'recommended',
    refs: {
      osRef: RefObject<HTMLInputElement | null>;
      cpuRef: RefObject<HTMLInputElement | null>;
      ramRef: RefObject<HTMLInputElement | null>;
      gpuRef: RefObject<HTMLInputElement | null>;
    }
  ) => (
    <>
      <SystemRequirementsInput
        label="OS"
        value={systemRequirements[prefix].os}
        handleChange={(e) =>
          handleInputChange(e, prefix === 'mini' ? updateMiniOS : updateRecommendedOS)
        }
        inputRef={refs.osRef}
      />
      <SystemRequirementsInput
        label="CPU"
        value={systemRequirements[prefix].cpu}
        handleChange={(e) =>
          handleInputChange(e, prefix === 'mini' ? updateMiniCPU : updateRecommendedCPU)
        }
        inputRef={refs.cpuRef}
      />
      <SystemRequirementsInput
        label="RAM"
        value={systemRequirements[prefix].ram}
        handleChange={(e) =>
          handleInputChange(e, prefix === 'mini' ? updateMiniRAM : updateRecommendedRAM)
        }
        inputRef={refs.ramRef}
      />
      <SystemRequirementsInput
        label="GPU"
        value={systemRequirements[prefix].gpu}
        handleChange={(e) =>
          handleInputChange(e, prefix === 'mini' ? updateMiniGPU : updateRecommendedGPU)
        }
        inputRef={refs.gpuRef}
      />
      <SystemRequirementsInput
        label={'STORAGE'}
        value={systemRequirements[prefix].storage}
        handleChange={(e) =>
          handleInputChange(e, prefix === 'mini' ? updateMiniStorage : updateRecommendedStorage)
        }
      />
      <SystemRequirementsInput
        label={'DX'}
        value={systemRequirements[prefix].dx}
        handleChange={(e) =>
          handleInputChange(e, prefix === 'mini' ? updateMiniDX : updateRecommendedDX)
        }
      />
      <SystemRequirementsInput
        label={'NETWORK'}
        value={systemRequirements[prefix].network}
        handleChange={(e) =>
          handleInputChange(e, prefix === 'mini' ? updateMiniNetwork : updateRecommendedNetwork)
        }
      />
      <SystemRequirementsInput
        label={'SOUNDCARD'}
        value={systemRequirements[prefix].soundCard}
        handleChange={(e) =>
          handleInputChange(e, prefix === 'mini' ? updateMiniSoundCard : updateRecommendedSoundCard)
        }
      />
      <SystemRequirementsInput
        label={'VR SUPPORT'}
        value={systemRequirements[prefix].vrSupport}
        handleChange={(e) =>
          handleInputChange(e, prefix === 'mini' ? updateMiniVrSupport : updateRecommendedVrSupport)
        }
      />
      <div className="form-field">
        <label className="field-label">Additional Notes:</label>
        <textarea
          className="field-input"
          value={systemRequirements[prefix].additionalNotes}
          onChange={(e) =>
            handleInputChange(
              e,
              prefix === 'mini' ? updateMiniAdditionalNotes : updateRecommendedAdditionalNotes
            )
          }
        />
      </div>
    </>
  );

  return (
    <>
      <section className="section-system-requirements">
        <h2>System Requirements</h2>
        <div className="form-field form-field-checkbox">
          <label className="field-label-checkbox">64-bit Operating System Required:</label>
          <input
            type="checkbox"
            className="field-checkbox"
            checked={systemRequirements.req64}
            onChange={handleRequired64bitChange}
          />
        </div>

        <div>
          <div className="form-field">
            <div className="form-row">
              <label className="field-label">Minimum</label>
              <p>OS, CPU, RAM, GPU, Storage are required</p>
            </div>

            {renderSystemRequirementInputs('mini', {
              osRef: miniOsRef,
              cpuRef: miniCpuRef,
              ramRef: miniRamRef,
              gpuRef: miniGpuRef,
            })}
          </div>

          <div className="form-field">
            <div className="form-row">
              <label className="field-label">Recommended</label>
              <p>OS, CPU, RAM, GPU, Storage are required</p>
            </div>

            {renderSystemRequirementInputs('recommended', {
              osRef: recommendedOsRef,
              cpuRef: recommendedCpuRef,
              ramRef: recommendedRamRef,
              gpuRef: recommendedGpuRef,
            })}
          </div>
        </div>
      </section>

      <br />
      <FormButtons
        validation={() =>
          validateSystemRequirements(systemRequirements, {
            miniOsRef,
            miniCpuRef,
            miniRamRef,
            miniGpuRef,
            recommendedOsRef,
            recommendedCpuRef,
            recommendedRamRef,
            recommendedGpuRef,
          })
        }
      />
    </>
  );
}
