'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setInitialSettings } from '@store/features/user/settings/userSettingsSlice';

// Components
import ChangeModal from './_Modals/ChangeModal';
import DeleteAccountModal from './_Modals/DeleteAccountModal';
import DeletePhoneModal from './_Modals/DeletePhoneModal';
import AccountSecuritySection from './AccountSecuritySection';
import ContactInfoSection from './ContactInfoSection';
import ProfileInfoSection from './ProfileInfoSection';
import SettingsHeader from './SettingsHeader';

export default function SettingsPage() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { isDeleteAccountModalVisible, isDeletePhoneModalVisible, isChangeModalVisible } =
    useAppSelector((state) => state.user.settings);

  //------------------------------ On Mount -------------------------------//
  useEffect(() => {
    if (currentUserData) {
      dispatch(setInitialSettings());
      document.title = `${currentUserData.username} Settings`;
    }
  }, [currentUserData, dispatch]);

  //-------------------------------- Render -------------------------------//

  return (
    <>
      <div className="user-settings-container">
        <SettingsHeader />

        <div className="user-settings-content setting-content">
          <ProfileInfoSection />
          <ContactInfoSection />
          <AccountSecuritySection />
        </div>
      </div>

      {isDeleteAccountModalVisible && <DeleteAccountModal />}
      {isDeletePhoneModalVisible && <DeletePhoneModal />}
      {isChangeModalVisible && <ChangeModal />}
    </>
  );
}
