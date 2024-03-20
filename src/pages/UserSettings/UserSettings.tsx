import {
  ChangeEvent,
  FC,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import DeleteAccountModal from './DeleteAccountModal';
import DeletePhoneModal from './DeletePhoneModal';
import ChangeModal from './ChangeModal';
import { toast } from 'react-toastify';
import { AuthContext } from 'contexts/AuthContext';
import {
  changeCountry,
  changeUserName,
  checkUsernameExists,
} from 'services/user/auth';
import { changeUserAvatar, deleteUserAvatar } from 'services/user/fileUpload';
import { countries } from 'services/countries';
import './UserSettings.scss';

const UserSettings: FC = () => {
  const { userData, fetchData } = useContext(AuthContext);
  const [showId, setShowId] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [isDeletePhoneModalOpen, setIsDeletePhoneModalOpen] = useState(false);
  const [nameAvailable, setNameAvailable] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    userData?.profilePicture || null,
  );
  const [selectedCountry, setSelectedCountry] = useState('PS');
  const [modalType, setModalType] = useState('');

  const submitAvatarRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const deleteAvatarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.background = '#1b2838';
  }, []);

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
        if (userData?._id) {
          await changeUserName(accountName, userData._id, password);
        }
        toast.success('Username updated successfully');
      } catch (error) {
        console.error('Error updating username:', error);
        toast.error(
          'An error occurred while updating username. Please try again.',
        );
      }
    } else if (formName === 'avatarForm') {
      if (avatarFile) {
        if (userData?._id) {
          submitAvatarRef.current!.disabled = true;
          const response = await changeUserAvatar(userData?._id, avatarFile);
          if (response && response.status === 200) fetchData();
        } else {
          toast.error(
            'An error occurred while updating avatar. Please try again.',
          );
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
    if (userData?._id) {
      try {
        deleteAvatarRef.current!.disabled = true;
        await deleteUserAvatar(userData?._id);
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
  const onCountryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCountry(selectedValue);
    if (userData?._id) {
      await changeCountry(userData._id, selectedValue);
    }
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
                  <span>{userData?._id}</span>
                  <a onClick={() => setShowId(false)}>
                    &nbsp;&nbsp;&nbsp;hide
                  </a>
                </>
              ) : (
                <a onClick={() => setShowId(true)}>
                  show
                </a>
              )}
            </p>
          </div>
        </div>
        <div className="user-settings-content setting-content">
          <div className="account-header-line">
            <img
              src="/images/icon_profile.png"
              style={{ transform: 'scale(0.8)' }}
            />
            Profile Info
          </div>
          <div className="account-settings-block">
            <h2>User Name</h2>
            <p>
              Set your username. This will be used as your display name and will
              be visible to other users.
            </p>
            <blockquote className="username-form">
              <form name="usernameForm" onSubmit={handleFormSubmit}>
                <div className="settings-input">
                  <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    defaultValue={userData?.username}
                    onChange={e => setAccountName(e.target.value)}
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
                        background: nameAvailable
                          ? 'rgb(92, 126, 16)'
                          : 'rgb(160, 56, 43)',
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
                    onChange={e => setPassword(e.target.value)}
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
                    src={
                      avatarPreview ? avatarPreview : '/images/default-pfp.png'
                    }
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
                    <button
                      onClick={handleAvatarRemove}
                      disabled={!avatarPreview}
                    >
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
                onChange={onCountryChange}
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
              <Link to="/user/tags">
                <button className="manage-tags">Manage your tags</button>
              </Link>
            </div>
          </div>
          <div className="account-header-line">
            <img src="/images/icon_email.png" />
            Contact Info
          </div>
          <div className="account-settings-block-short">
            <div style={{ padding: '10px 0' }}>
              <span className="account-manage-label">Email address:</span>
              &nbsp;
              <span className="account-data-field">{userData?.email}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a
                onClick={e => {
                  e.preventDefault();
                  openChangeModal('email');
                }}
              >
                Change
              </a>
            </div>
            <div>
              <div className="phone-header-description">
                <span className="account-manage-label">Phone:</span>&nbsp;
                {userData?.phoneNumber && (
                  <img src="/images/icon_mobile.png" alt="" />
                )}
                &nbsp;
                <span className="account-data-field">
                  {userData?.phoneNumber
                    ? `Ends in ${userData.phoneNumber.substring(userData.phoneNumber.length - 2)}`
                    : ''}
                </span>
                &nbsp;{userData?.phoneNumber && <>&nbsp;&nbsp;&nbsp;</>}
                <a
                  onClick={e => {
                    e.preventDefault();
                    openChangeModal('phone');
                  }}
                >
                  {userData?.phoneNumber ? 'Change' : 'Add'}
                </a>
                {userData?.phoneNumber && (
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a
                      onClick={e => {
                        e.preventDefault();
                        openDeletePhoneModal();
                      }}
                    >
                      Remove
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="account-header-line">
            <img src="/images/icon_steamguard.png" />
            Account Security
          </div>
          <div className="account-settings-block-short">
            <div className="account-setting-sub-block-long">
              <a
                onClick={e => {
                  e.preventDefault();
                  openChangeModal('password');
                }}
              >
                Change your password
              </a>
              &nbsp;- Change your password to a new one for your Steam account.
            </div>
            <div className="account-setting-sub-block-long">
              <a onClick={openDeleteModal}>Delete my Steam account</a>
              &nbsp;- Permanently delete your account and associated
              information.
            </div>
          </div>
        </div>
      </div>
      {isDeleteAccountModalOpen && (
        <DeleteAccountModal onClose={closeDeleteModal} />
      )}
      {isDeletePhoneModalOpen && (
        <DeletePhoneModal onClose={closeDeletePhoneModal} />
      )}
      {isChangeModalOpen && (
        <ChangeModal type={modalType} onClose={closeChangeModal} />
      )}
      <Footer />
    </>
  );
};

export default UserSettings;
