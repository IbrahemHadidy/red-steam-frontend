// NextJS
import Image from 'next/image';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setChangeModalType,
  setChangeModalVisiblity,
  setDeletePhoneModalVisiblity,
} from '@store/features/user/settings/userSettingsSlice';

// Images
import emailIcon from '@images/icon_email.png';
import mobileIcon from '@images/icon_mobile.png';

// Types
import type { ChangeModalType } from '@store/features/user/settings/userSettingsSlice';
import type { MouseEvent } from 'react';

export default function ContactInfoSection() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);

  //---------------------------- Event Handlers ----------------------------//
  const openChangeModal = (type: ChangeModalType): void => {
    dispatch(setChangeModalType(type));
    dispatch(setChangeModalVisiblity(true));
    document.body.style.overflow = 'hidden';
  };

  const handleChangeEmailClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    openChangeModal('email');
  };

  const handleChangePhoneClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    openChangeModal('phone');
  };

  const handleDeletePhoneClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    dispatch(setDeletePhoneModalVisiblity(true));
  };

  //-------------------------------- Render -------------------------------//

  return (
    <>
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
          <div className="phone-header-description disabled">
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
    </>
  );
}
