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
import { checkAccountAvailability } from 'services/authentication';
import { changeUserAvatar, changeUserName } from 'services/userSettings';
import { fetchUserCountry } from 'services/countryCode';
import { countries } from 'services/countries';
import './UserSettings.scss';

const UserSettings: FC = () => {
  const { userData } = useContext(AuthContext);
  const [accountName, setAccountName] = useState('');
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [isDeletePhoneModalOpen, setIsDeletePhoneModalOpen] = useState(false);
  const [nameAvailable, setNameAvailable] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('PS');
  const [modalType, setModalType] = useState('');

  const submitUsernameRef = useRef<HTMLButtonElement>(null);
  const submitAvatarRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.background = '#1b2838';
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const country = await fetchUserCountry();
      if (country) {
        setSelectedCountry(country);
      }
    };
    fetchData();
  }, []);

  const openDeleteModal = () => {
    setIsDeleteAccountModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const openDeletePhoneModal = () => {
    setIsDeletePhoneModalOpen(true);
  }

  const closeDeletePhoneModal = () => {
    setIsDeletePhoneModalOpen(false);
  }
 
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
        await changeUserName(accountName);
        toast.success('Username updated successfully');
      } catch (error) {
        console.error('Error updating username:', error);
        toast.error(
          'An error occurred while updating username. Please try again.',
        );
      }
    } else if (formName === 'avatarForm') {
      if (avatarFile) {
        await changeUserAvatar(avatarFile);
        toast.success('Avatar updated successfully');
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

  const handleAvatarDelete = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    submitAvatarRef.current!.disabled = true;
  };

  useEffect(() => {
    const checkAvailability = async () => {
      if (accountName.length === 0) {
        setNameAvailable(true);
        if (submitUsernameRef.current) {
          submitUsernameRef.current.disabled = true;
        }
      } else {
        setNameAvailable(false);
        try {
          if (submitUsernameRef.current) {
            submitUsernameRef.current.disabled = false;
          }
          const available = await checkAccountAvailability(accountName);

          if (available) {
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
  const onCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCountry(selectedValue);
  };

  return (
    <>
      <Header />
      <div className="user-settings-container">
        <div className="user-settings-header">
          <div className="setting-content">
            <h2 className="user-name-header">{userData?.username}'S ACCOUNT</h2>
            <p className="user-id-header">STEAM ID: {userData?.userId}</p>
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
                  <button ref={submitUsernameRef} type="submit" disabled>
                    Save
                  </button>
                )}
                <div className="settings-input">
                  <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    defaultValue={''}
                    onChange={e => setAccountName(e.target.value)}
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
                      onClick={handleAvatarDelete}
                      disabled={!avatarPreview}
                    >
                      Remove Avatar
                    </button>
                    <button ref={submitAvatarRef} type="submit" disabled>
                      Save Avatar
                    </button>
                  </div>
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
              <span className="account-data-field">
                {userData?.email}
              </span>
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
                {userData?.phoneNumber && <img src="/images/icon_mobile.png" alt="" />}
                &nbsp;
                <span className="account-data-field">
                  {userData?.phoneNumber ? `Ends in ${userData.phoneNumber}` : ''}
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
