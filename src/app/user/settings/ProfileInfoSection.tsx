// React
import { useRef } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setAvatarPreview,
  setSubmitAvatarButtonDisabled,
  updateAvatarFile,
  updateCurrentPassword,
  updateNewUsername,
} from '@store/features/user/settings/userSettingsSlice';

// Redux Thunks
import {
  changeAvatar,
  changeCountry,
  changeUsername,
  deleteAvatar,
} from '@store/features/user/settings/userSettingsThunks';

// Utils
import { countries } from '@utils/countries';
import { saveFileToIndexedDB } from '@utils/filesStorageUtils';

// Images
import defaultPFP from '@images/default-pfp.png';
import profileIcon from '@images/icon_profile.png';

// Types
import type { ChangeEvent, FormEvent } from 'react';

export default function ProfileInfoSection() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const {
    isUsernameAvailable,
    newUsername,
    selectedCountry,
    avatarPreview,
    currentPassword,
    submitAvatarButtonDisabled,
    isChangeModalVisible,
    isDeleteAccountModalVisible,
    isDeletePhoneModalVisible,
    nextStepButtonDisabled,
  } = useAppSelector((state) => state.user.settings);

  //-------------------------------- Refs ---------------------------------//
  const fileInputRef = useRef<HTMLInputElement>(null);

  //---------------------------- Event Handlers ----------------------------//
  const handleNewUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateNewUsername(value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    dispatch(updateCurrentPassword(value));
  };

  const handleCountryChange = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const value = e.target.value;
    await dispatch(changeCountry(value));
  };

  const handleUsernameFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(changeUsername());
  };

  const handleAvatarFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await dispatch(changeAvatar());
  };

  const handleAvatarDelete = async (): Promise<void> => {
    await dispatch(deleteAvatar());
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const avatarId = await saveFileToIndexedDB(file);
      dispatch(
        updateAvatarFile({ id: avatarId, name: file.name, size: file.size, type: file.type })
      );
      dispatch(setAvatarPreview(URL.createObjectURL(file)));
      dispatch(setSubmitAvatarButtonDisabled(false));
    }
  };

  const handleAvatarRemove = (): void => {
    dispatch(updateAvatarFile(null));
    dispatch(setAvatarPreview(null));
    dispatch(setSubmitAvatarButtonDisabled(true));
  };

  //-------------------------------- Render -------------------------------//
  return (
    <>
      <div className="account-header-line">
        <Image src={profileIcon} style={{ transform: 'scale(0.8)' }} alt="profile-icon" />
        Profile Info
      </div>

      <div className="account-settings-block">
        <h2>User Name</h2>
        <p>
          Set your username. This will be used as your display name and will be visible to other
          users.
        </p>

        <blockquote className="username-form">
          <form name="usernameForm" onSubmit={handleUsernameFormSubmit}>
            <div className="settings-input">
              <input
                type="text"
                name="username"
                autoComplete="off"
                defaultValue={currentUserData?.username}
                onChange={handleNewUsernameChange}
              />
            </div>

            {!isUsernameAvailable ? (
              <div
                className="availability-container"
                style={{
                  display: newUsername !== '' ? 'block' : 'none',
                }}
              >
                <div
                  className="availability"
                  style={{
                    background: 'rgb(160, 56, 43)',
                    display: newUsername !== '' ? 'inline-block' : 'none',
                  }}
                >
                  Name Not Available
                </div>
              </div>
            ) : (
              <button
                type="submit"
                disabled={
                  !isUsernameAvailable ||
                  nextStepButtonDisabled ||
                  isChangeModalVisible ||
                  isDeleteAccountModalVisible ||
                  isDeletePhoneModalVisible ||
                  currentPassword.length < 8 ||
                  ['', currentUserData?.username].includes(newUsername)
                }
              >
                Save
              </button>
            )}

            <div className="settings-input">
              <input
                type="password"
                name="password"
                value={
                  isChangeModalVisible || isDeleteAccountModalVisible || isDeletePhoneModalVisible
                    ? ''
                    : currentPassword
                }
                autoComplete="off"
                placeholder="Enter your password"
                onChange={handlePasswordChange}
              />
            </div>
          </form>
        </blockquote>

        <div className="avatar-form">
          <form name="avatarForm" onSubmit={handleAvatarFormSubmit}>
            <h2>Avatar</h2>
            <p>Choose your avatar image.</p>

            <div className="avatar-selection">
              <input
                ref={fileInputRef}
                type="file"
                className="file-input"
                accept="image/*"
                onClick={(e) => ((e.target as HTMLInputElement).value = '//:0')}
                onChange={handleFileChange}
              />

              <img
                src={avatarPreview ? avatarPreview : defaultPFP.src}
                alt="Avatar Preview"
                height="100px"
                width="100px"
              />

              <div>
                <button
                  className="upload-button"
                  type="button"
                  onClick={() => fileInputRef.current!.click()}
                >
                  Upload Avatar
                </button>

                <button onClick={handleAvatarRemove} disabled={!avatarPreview}>
                  Remove Avatar
                </button>

                <button type="submit" disabled={submitAvatarButtonDisabled}>
                  Save Avatar
                </button>
              </div>

              <button
                className="delete-button"
                type="button"
                onClick={handleAvatarDelete}
                disabled={!currentUserData?.profilePicture}
              >
                Delete Current Avatar
              </button>
            </div>
          </form>
        </div>

        <div className="country-form">
          <label className="country-select" htmlFor="country">
            Current Country
          </label>
          <select
            name="country"
            id="country"
            className="country-selector"
            onChange={handleCountryChange}
            value={selectedCountry}
          >
            {countries.map(([countryCode, countryName]) => (
              <option key={countryCode} value={countryCode}>
                {countryName}
              </option>
            ))}
          </select>
        </div>

        <div className="tags-change">
          <h2>Tags Prefernces</h2>
          <Link href="/user/tags">
            <button className="manage-tags">Manage your tags</button>
          </Link>
        </div>
      </div>
    </>
  );
}
