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
    if (currentPage === CurrentGameAdminPage.PREVIEW) {
      await dispatch(submitForm(router));
    } else if (currentPage === CurrentGameAdminPage.ADDITIONAL_INFO) {
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
    dispatch(setPage(CurrentGameAdminPage.BASIC));
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
        {currentPage === CurrentGameAdminPage.PREVIEW
          ? type === GameAdminType.UPDATE
            ? 'Update'
            : 'Create'
          : currentPage === CurrentGameAdminPage.ADDITIONAL_INFO
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

      {currentPage !== CurrentGameAdminPage.BASIC && (
        <button type="button" className="back-button" onClick={handlePrevClick}>
          Back
        </button>
      )}
    </div>
  );
}
