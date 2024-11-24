// NextJS
import Image from 'next/image';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux Handlers
import {
  setChangeModalType,
  setChangeModalVisiblity,
  setDeleteAccountModalVisiblity,
} from '@store/features/user/settings/userSettingsSlice';

// Images
import guardIcon from '@images/icon_steamguard.png';

// Types
import type { ChangeModalType } from '@store/features/user/settings/userSettingsSlice';
import type { MouseEvent } from 'react';

export default function AccountSecuritySection() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //---------------------------- Event Handlers ----------------------------//
  const openDeleteModal = (): void => {
    dispatch(setDeleteAccountModalVisiblity(true));
    document.body.style.overflow = 'hidden';
  };

  const openChangeModal = (type: ChangeModalType): void => {
    dispatch(setChangeModalType(type));
    dispatch(setChangeModalVisiblity(true));
    document.body.style.overflow = 'hidden';
  };

  const handleChangePasswordClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    openChangeModal('password');
  };

  //-------------------------------- Render -------------------------------//

  return (
    <>
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
    </>
  );
}
