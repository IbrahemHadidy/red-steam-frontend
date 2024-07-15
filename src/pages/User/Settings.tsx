'use client';

// React
import { useContext, useEffect, useRef, useState } from 'react';

// Next.js
import Image from 'next/image';
import Link from 'next/link';

// Toast notifications
import { toast } from 'react-toastify';

// Contexts
import { AuthContext } from 'contexts/AuthContext';

// Components
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import ChangeModal from './ChangeModal';
import DeleteAccountModal from './DeleteAccountModal';
import DeletePhoneModal from './DeletePhoneModal';

// Hooks
import useDynamicMetaTags from 'hooks/useDynamicMetaTags';

// Services
import { countries } from 'services/countries/countries';
import {
  changeCountry,
  changeUserName,
  checkUsernameExists,
  deleteAvatar,
  uploadAvatar,
} from 'services/user/management';

// Images
import defaultPFP from 'images/default-pfp.png';
import emailIcon from 'images/icon_email.png';
import mobileIcon from 'images/icon_mobile.png';
import profileIcon from 'images/icon_profile.png';
import guardIcon from 'images/icon_steamguard.png';

// Styles
import './UserSettings.scss';

// Types
import type {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent as ReactMouseEvent,
  SetStateAction,
} from 'react';

const UserSettings: FC = () => {
  // Contexts
  const { userData, userPFP, fetchData } = useContext(AuthContext);

  // States
  const [showId, setShowId] = useState<boolean>(false);
  const [accountName, setAccountName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isChangeModalOpen, setIsChangeModalOpen] = useState<boolean>(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState<boolean>(false);
  const [isDeletePhoneModalOpen, setIsDeletePhoneModalOpen] = useState<boolean>(false);
  const [nameAvailable, setNameAvailable] = useState<boolean>(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(userPFP || null);
  const [selectedCountry, setSelectedCountry] = useState<string>('PS');
  const [modalType, setModalType] = useState<string>('');

  // Refs
  const submitAvatarRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const deleteAvatarRef = useRef<HTMLButtonElement>(null);

  useDynamicMetaTags(
    {
      title: `${userData?.username} Settings`,
      background: '#1b2838',
    },
    [userData?.username]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    userData && setSelectedCountry(userData.country);
  }, [userData]);

  const openDeleteModal = () => {
    setIsDeleteAccountModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const openDeletePhoneModal = () => {
    setIsDeletePhoneModalOpen(true);
  };

  const closeDeletePhoneModal = () => {
    setIsDeletePhoneModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteAccountModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openChangeModal = (type: SetStateAction<string>) => {
    setModalType(type);
    setIsChangeModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeChangeModal = () => {
    setIsChangeModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formName = e.currentTarget.name;

    if (formName === 'usernameForm') {
      try {
        if (userData?.id) {
          await changeUserName(accountName, password);
        }
        toast.success('Username updated successfully');
      } catch (error) {
        console.error('Error updating username:', error);
        toast.error('An error occurred while updating username. Please try again.');
      }
    } else if (formName === 'avatarForm') {
      if (avatarFile) {
        if (userData?.id) {
          submitAvatarRef.current!.disabled = true;
          const response = await uploadAvatar(avatarFile);
          if (response && response.status === 200) fetchData();
        } else {
          toast.error('An error occurred while updating avatar. Please try again.');
        }
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      submitAvatarRef.current!.disabled = false;
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarFile(file);
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarRemove = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    submitAvatarRef.current!.disabled = true;
  };

  const handleAvatarDelete = async () => {
    if (userData?.id) {
      try {
        deleteAvatarRef.current!.disabled = true;
        await deleteAvatar();
        setAvatarFile(null);
        setAvatarPreview(null);
        fetchData();
      } catch (error) {
        console.error('Error deleting avatar:', error);
        deleteAvatarRef.current!.disabled = false;
      }
    }
  };

  useEffect(() => {
    const checkAvailability = async () => {
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
  const handleCountryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCountry(selectedValue);
    if (userData?.id) {
      await changeCountry(selectedValue);
    }
  };

  const handleShowIdClick = () => {
    setShowId(true);
  };

  const handleHideIdClick = () => {
    setShowId(false);
  };

  const handleAccountNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleChangeEmailClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openChangeModal('email');
  };

  const handleChangePasswordClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openChangeModal('password');
  };

  const handleChangePhoneClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openChangeModal('phone');
  };

  const handleDeletePhoneClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openDeletePhoneModal();
  };

  return (
    <>
      <Header />
      <div className="user-settings-container">
        <div className="user-settings-header">
          <div className="setting-content">
            <h2 className="user-name-header">{userData?.username}'S ACCOUNT</h2>
            <p className="user-id-header">
              RED STEAM ID:{' '}
              {showId ? (
                <>
                  <span>{userData?.id}</span>
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
                    defaultValue={userData?.username}
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
                    disabled={userData?.profilePicture === undefined}
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
              <span className="account-data-field">{userData?.email}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a onClick={handleChangeEmailClick}>Change</a>
            </div>
            <div>
              <div className="phone-header-description">
                <span className="account-manage-label">Phone:</span>&nbsp;
                {userData?.phoneNumber && <Image src={mobileIcon} alt="" />}
                &nbsp;
                <span className="account-data-field">
                  {userData?.phoneNumber
                    ? `Ends in ${userData.phoneNumber.substring(userData.phoneNumber.length - 2)}`
                    : ''}
                </span>
                &nbsp;{userData?.phoneNumber && <>&nbsp;&nbsp;&nbsp;</>}
                <a onClick={handleChangePhoneClick}>{userData?.phoneNumber ? 'Change' : 'Add'}</a>
                {userData?.phoneNumber && (
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
      <Footer />
    </>
  );
};

export default UserSettings;
