'use client';

// React
import { useEffect, useRef, useState } from 'react';

// NextJS
import Image from 'next/image';
import Link from 'next/link';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Thunks
import { fetchUserData } from '@store/features/auth/authThunks';

// Components
import ChangeModal from './_Modals/ChangeModal';
import DeleteAccountModal from './_Modals/DeleteAccountModal';
import DeletePhoneModal from './_Modals/DeletePhoneModal';

// Utils
import { countries } from '@utils/countries';

// Services
import {
  changeCountry,
  changeUserName,
  checkUsernameExists,
  deleteAvatar,
  uploadAvatar,
} from '@services/user/management';

// Images
import defaultPFP from '@images/default-pfp.png';
import emailIcon from '@images/icon_email.png';
import mobileIcon from '@images/icon_mobile.png';
import profileIcon from '@images/icon_profile.png';
import guardIcon from '@images/icon_steamguard.png';

// Types
import type { ChangeEvent, FormEvent, JSX, MouseEvent, SetStateAction } from 'react';

export default function SettingsPage(): JSX.Element {
  // Init
  const dispatch = useAppDispatch();

  // States
  const { currentUserData } = useAppSelector((state) => state.auth);
  const [showId, setShowId] = useState<boolean>(false);
  const [accountName, setAccountName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isChangeModalOpen, setIsChangeModalOpen] = useState<boolean>(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState<boolean>(false);
  const [isDeletePhoneModalOpen, setIsDeletePhoneModalOpen] = useState<boolean>(false);
  const [nameAvailable, setNameAvailable] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    currentUserData?.profilePicture || null
  );
  const [selectedCountry, setSelectedCountry] = useState<string>('PS');
  const [modalType, setModalType] = useState<string>('');

  // Refs
  const submitAvatarRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const deleteAvatarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    currentUserData && setSelectedCountry(currentUserData.country);
    currentUserData && (document.title = `${currentUserData.username} Settings`);
  }, [currentUserData]);

  const openDeleteModal = (): void => {
    setIsDeleteAccountModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const openDeletePhoneModal = (): void => {
    setIsDeletePhoneModalOpen(true);
  };

  const closeDeletePhoneModal = (): void => {
    setIsDeletePhoneModalOpen(false);
  };

  const closeDeleteModal = (): void => {
    setIsDeleteAccountModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openChangeModal = (type: SetStateAction<string>): void => {
    setModalType(type);
    setIsChangeModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeChangeModal = (): void => {
    setIsChangeModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formName: string = e.currentTarget.name;

    if (formName === 'usernameForm') {
      try {
        if (currentUserData?.id) {
          await changeUserName(accountName, password);
        }
        toast.success('Username updated successfully');
      } catch (error) {
        console.error('Error updating username:', error);
        toast.error('An error occurred while updating username. Please try again.');
      }
    } else if (formName === 'avatarForm') {
      if (avatarFile) {
        if (currentUserData?.id) {
          submitAvatarRef.current!.disabled = true;
          await toast.promise(uploadAvatar(avatarFile), {
            pending: 'Uploading avatar...',
            success: 'Avatar uploaded successfully',
            error: 'An error occurred while uploading avatar. Please try again.',
          });
          await dispatch(fetchUserData());
        } else {
          toast.error('An error occurred while updating avatar. Please try again.');
        }
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      submitAvatarRef.current!.disabled = false;
      const reader: FileReader = new FileReader();
      reader.onloadend = () => {
        setAvatarFile(file);
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarRemove = (): void => {
    setAvatarFile(null);
    setAvatarPreview(null);
    submitAvatarRef.current!.disabled = true;
  };

  const handleAvatarDelete = async (): Promise<void> => {
    if (currentUserData?.id) {
      try {
        deleteAvatarRef.current!.disabled = true;
        await deleteAvatar();
        setAvatarFile(null);
        setAvatarPreview(null);
        await dispatch(fetchUserData());
      } catch (error) {
        console.error('Error deleting avatar:', error);
        deleteAvatarRef.current!.disabled = false;
      }
    }
  };

  useEffect(() => {
    const checkAvailability = async (): Promise<void> => {
      if (accountName.length === 0) {
        setNameAvailable(true);
      } else {
        setNameAvailable(false);
        try {
          const response = await checkUsernameExists(accountName);

          if (!response) {
            setNameAvailable(true);
          } else {
            setNameAvailable(false);
          }
        } catch (error) {
          console.error('Error checking account availability:', error);
        }
      }
    };
    checkAvailability();
  }, [accountName]);

  // handle country change
  const handleCountryChange = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
    const selectedValue: string = e.target.value;
    setSelectedCountry(selectedValue);
    if (currentUserData?.id) {
      await changeCountry(selectedValue);
    }
  };

  const handleShowIdClick = (): void => {
    setShowId(true);
  };

  const handleHideIdClick = (): void => {
    setShowId(false);
  };

  const handleAccountNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAccountName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleChangeEmailClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    openChangeModal('email');
  };

  const handleChangePasswordClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    openChangeModal('password');
  };

  const handleChangePhoneClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    openChangeModal('phone');
  };

  const handleDeletePhoneClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    openDeletePhoneModal();
  };

  return (
    <>
      <div className="user-settings-container">
        <div className="user-settings-header">
          <div className="setting-content">
            <h2 className="user-name-header">{currentUserData?.username}'S ACCOUNT</h2>
            <p className="user-id-header">
              RED STEAM ID:{' '}
              {showId ? (
                <>
                  <span>{currentUserData?.id}</span>
                  <a onClick={handleHideIdClick}>&nbsp;&nbsp;&nbsp;hide</a>
                </>
              ) : (
                <a onClick={handleShowIdClick}>show</a>
              )}
            </p>
          </div>
        </div>
        <div className="user-settings-content setting-content">
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
              <form name="usernameForm" onSubmit={handleFormSubmit}>
                <div className="settings-input">
                  <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    defaultValue={currentUserData?.username}
                    onChange={handleAccountNameChange}
                  />
                </div>
                {!nameAvailable ? (
                  <div
                    className="availability-container"
                    style={{
                      display: accountName !== '' ? 'block' : 'none',
                    }}
                  >
                    <div
                      className="availability"
                      style={{
                        background: nameAvailable ? 'rgb(92, 126, 16)' : 'rgb(160, 56, 43)',
                        display: accountName !== '' ? 'inline-block' : 'none',
                      }}
                    >
                      Name Not Available
                    </div>
                  </div>
                ) : (
                  <button type="submit">Save</button>
                )}
                <div className="settings-input">
                  <input
                    type="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    onChange={handlePasswordChange}
                  />
                </div>
              </form>
            </blockquote>
            <div className="avatar-form">
              <form name="avatarForm" onSubmit={handleFormSubmit}>
                <h2>Avatar</h2>
                <p>Choose your avatar image.</p>
                <div className="avatar-selection">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="file-input"
                    accept="image/*"
                    onClick={(e) => ((e.target as HTMLInputElement).value = '')}
                    onChange={handleFileChange}
                  />
                  <img
                    src={avatarPreview ? avatarPreview : defaultPFP.src}
                    alt="Avatar Preview"
                    style={{ width: '100px', height: '100px' }}
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
                    <button ref={submitAvatarRef} type="submit" disabled>
                      Save Avatar
                    </button>
                  </div>
                  <button
                    className="delete-button"
                    type="button"
                    ref={deleteAvatarRef}
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
          <div className="account-header-line">
            <Image src={emailIcon} alt="email-icon" />
            Contact Info
          </div>
          <div className="account-settings-block-short">
            <div style={{ padding: '10px 0' }}>
              <span className="account-manage-label">Email address:</span>
              &nbsp;
              <span className="account-data-field">{currentUserData?.email}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a onClick={handleChangeEmailClick}>Change</a>
            </div>
            <div>
              <div className="phone-header-description">
                <span className="account-manage-label">Phone:</span>&nbsp;
                {currentUserData?.phoneNumber && <Image src={mobileIcon} alt="" />}
                &nbsp;
                <span className="account-data-field">
                  {currentUserData?.phoneNumber
                    ? `Ends in ${currentUserData.phoneNumber.substring(currentUserData.phoneNumber.length - 2)}`
                    : ''}
                </span>
                &nbsp;{currentUserData?.phoneNumber && <>&nbsp;&nbsp;&nbsp;</>}
                <a onClick={handleChangePhoneClick}>
                  {currentUserData?.phoneNumber ? 'Change' : 'Add'}
                </a>
                {currentUserData?.phoneNumber && (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a onClick={handleDeletePhoneClick}>Remove</a>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="account-header-line">
            <Image src={guardIcon} alt="guard-icon" />
            Account Security
          </div>
          <div className="account-settings-block-short">
            <div className="account-setting-sub-block-long">
              <a onClick={handleChangePasswordClick}>Change your password</a>
              &nbsp;- Change your password to a new one for your Steam account.
            </div>
            <div className="account-setting-sub-block-long">
              <a onClick={openDeleteModal}>Delete my Steam account</a>
              &nbsp;- Permanently delete your account and associated information.
            </div>
          </div>
        </div>
      </div>
      {isDeleteAccountModalOpen && <DeleteAccountModal onClose={closeDeleteModal} />}
      {isDeletePhoneModalOpen && <DeletePhoneModal onClose={closeDeletePhoneModal} />}
      {isChangeModalOpen && <ChangeModal type={modalType} onClose={closeChangeModal} />}
    </>
  );
}
