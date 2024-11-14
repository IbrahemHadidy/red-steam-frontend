// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { toggleIdVisibility } from '@store/features/user/settings/userSettingsSlice';

export default function SettingsHeader() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentUserData } = useAppSelector((state) => state.auth);
  const { isIdVisible } = useAppSelector((state) => state.user.settings);

  //---------------------------- Event Handlers ---------------------------//
  const handleShowHideId = (): void => {
    dispatch(toggleIdVisibility());
  };

  //--------------------------- Render UI Section -------------------------//
  return (
    <div className="user-settings-header">
      <div className="setting-content">
        <h2 className="user-name-header">{currentUserData?.username}'S ACCOUNT</h2>

        <p className="user-id-header">
          RED STEAM ID:&nbsp;
          {isIdVisible ? (
            <>
              <span>{currentUserData?.id}</span>
              <a onClick={handleShowHideId}>&nbsp;&nbsp;&nbsp;hide</a>
            </>
          ) : (
            <a onClick={handleShowHideId}>show</a>
          )}
        </p>
      </div>
    </div>
  );
}
