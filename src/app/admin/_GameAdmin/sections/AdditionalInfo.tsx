// React
import { useRef } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  toggleMature,
  updateAbout,
  updateLegal,
  updateLink,
  updateMatureDescription,
} from '@store/features/admin/game/gameAdminSlice';

// Components
import FormButtons from '../FormButtons';

// Form Validation
import { validateAdditionalInfo } from '../validations';

// Types
import type { ChangeEvent } from 'react';

export default function AdditionalInfo() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const { link, about, mature, matureDescription, legal } = useAppSelector(
    (state) => state.admin.game
  );

  //------------------------------ References -----------------------------//
  const linkRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);
  const matureDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const legalRef = useRef<HTMLTextAreaElement>(null);

  //---------------------------- Event Handlers ----------------------------//
  const handleLinkChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateLink(value));
  };

  const handleAboutChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    dispatch(updateAbout(value));
  };

  const handleMatureChange = (): void => {
    dispatch(toggleMature());
  };

  const handleMatureDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    dispatch(updateMatureDescription(value));
  };

  const handleLegalChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    dispatch(updateLegal(value));
  };

  //-------------------------- Render UI Section --------------------------//
  return (
    <>
      <section className="section-additional-info">
        <h2>About</h2>

        <div className="form-field">
          <label className="field-label">Link (optional)</label>
          <input
            type="text"
            className="field-input"
            value={link}
            onChange={handleLinkChange}
            ref={linkRef}
          />
        </div>

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
            onChange={handleAboutChange}
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

      <br />
      <FormButtons
        validation={() =>
          validateAdditionalInfo(
            { link, about, mature, matureDescription, legal },
            { linkRef, aboutRef, matureDescriptionRef, legalRef }
          )
        }
      />
    </>
  );
}
