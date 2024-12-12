// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { nextPage, prevPage, reset, setPage } from '@store/features/admin/game/gameAdminSlice';

// Redux Thunks
import { getPreviewData, submitForm } from '@store/features/admin/game/gameAdminThunks';

// Utils
import scrollToTop from '@utils/scrollToTop';

// Enums
import { CurrentGameAdminPage, GameAdminType } from '@enums/admin';

interface FormButtonsProps {
  validation?: () => boolean;
}

export default function FormButtons({ validation }: FormButtonsProps) {
  //--------------------------- Initializations ---------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { type, currentPage, loading } = useAppSelector((state) => state.admin.game);

  //---------------------------- Event Handlers ---------------------------//
  const handleNextClick = async () => {
    scrollToTop();
    if (currentPage === CurrentGameAdminPage.Preview) {
      await dispatch(submitForm(router));
    } else if (currentPage === CurrentGameAdminPage.AdditionalInfo) {
      await dispatch(getPreviewData());
    } else {
      if (validation && validation() === false) return;
      dispatch(nextPage());
    }
  };

  const handlePrevClick = () => {
    scrollToTop();
    dispatch(prevPage());
  };

  const handleResetClick = () => {
    scrollToTop();
    dispatch(reset());
    dispatch(setPage(CurrentGameAdminPage.Basic));
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="form-buttons">
      <button
        type="submit"
        className={`submit-button ${loading ? 'loading' : ''}`}
        onClick={handleNextClick}
        disabled={loading}
      >
        {currentPage === CurrentGameAdminPage.Preview
          ? type === GameAdminType.Update
            ? 'Update'
            : 'Create'
          : currentPage === CurrentGameAdminPage.AdditionalInfo
            ? 'Preview'
            : 'Next'}
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner" />
          </div>
        )}
      </button>

      <button type="button" className="reset-button" onClick={handleResetClick}>
        Reset
      </button>

      {currentPage !== CurrentGameAdminPage.Basic && (
        <button type="button" className="back-button" onClick={handlePrevClick}>
          Back
        </button>
      )}
    </div>
  );
}
