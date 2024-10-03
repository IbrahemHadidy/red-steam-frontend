// Types
import type { ChangeEvent, Dispatch, JSX, RefObject, SetStateAction } from 'react';
interface AdditionalInfoProps {
  about: string;
  setAbout: Dispatch<SetStateAction<string>>;
  mature: boolean;
  setMature: Dispatch<SetStateAction<boolean>>;
  matureDescription: string;
  setMatureDescription: Dispatch<SetStateAction<string>>;
  legal: string;
  setLegal: Dispatch<SetStateAction<string>>;
  aboutRef: RefObject<HTMLTextAreaElement>;
  matureDescriptionRef: RefObject<HTMLTextAreaElement>;
  legalRef: RefObject<HTMLTextAreaElement>;
}

export default function AdditionalInfo({
  about,
  setAbout,
  mature,
  setMature,
  matureDescription,
  setMatureDescription,
  legal,
  setLegal,
  aboutRef,
  matureDescriptionRef,
  legalRef,
}: AdditionalInfoProps): JSX.Element {
  // Event Handlers
  const handleMatureChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMature(e.target.checked);
  };

  const handleMatureDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMatureDescription(e.target.value);
  };

  const handleLegalChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setLegal(e.target.value);
  };

  return (
    <section className="section-additional-info">
      <h2>About</h2>
      <div className="form-field">
        <div className="form-row">
          <label className="field-label">
            Write about the game (<span>required, &nbsp;HTML &nbsp;allowed</span>):
          </label>
          <p>*Required</p>
        </div>
        <textarea
          className="field-input"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          ref={aboutRef}
        />
      </div>
      <hr />
      <h2>Additional Information</h2>
      <div className="form-field form-field-checkbox">
        <label className="field-label-checkbox">Mature Content:</label>

        <input
          type="checkbox"
          className="field-checkbox"
          checked={mature}
          onChange={handleMatureChange}
        />
      </div>
      {mature && (
        <div className="form-field">
          <div className="form-row">
            <label className="field-label">
              Mature Description (<span>required, &nbsp;HTML &nbsp;allowed</span>):
            </label>
            <p>*Required</p>
          </div>
          <textarea
            className="field-input"
            value={matureDescription}
            onChange={handleMatureDescriptionChange}
            ref={matureDescriptionRef}
          />
        </div>
      )}
      <div className="form-field">
        <label className="field-label">
          Legal (<span>optional, &nbsp;HTML &nbsp;allowed</span>):
        </label>
        <textarea
          className="field-input"
          value={legal}
          onChange={handleLegalChange}
          ref={legalRef}
        />
      </div>
    </section>
  );
}
