// NextJS
import dynamic from 'next/dynamic';

// Redux Hooks
import { useAppSelector } from '@store/hooks';

// Utils
import { isCompany, isFeature, isGame, isLanguage, isReview, isTag } from '@utils/typeGuards';

// Components
const CompanyHeaders = dynamic(() => import('./headers/CompanyHeaders'));
const FeatureHeaders = dynamic(() => import('./headers/FeatureHeaders'));
const LanguageHeaders = dynamic(() => import('./headers/LanguageHeaders'));
const OfferHeaders = dynamic(() => import('./headers/OfferHeaders'));
const ReviewHeaders = dynamic(() => import('./headers/ReviewHeaders'));
const TagHeaders = dynamic(() => import('./headers/TagHeaders'));
const ActionsRow = dynamic(() => import('./rows/ActionsRow'));
const CompanyRows = dynamic(() => import('./rows/CompanyRows'));
const FeatureRows = dynamic(() => import('./rows/FeatureRows'));
const LanguageRows = dynamic(() => import('./rows/LanguageRows'));
const OfferRows = dynamic(() => import('./rows/OfferRows'));
const ReviewRows = dynamic(() => import('./rows/ReviewRows'));
const TagRows = dynamic(() => import('./rows/TagRows'));

// Enums
import { AdminType } from '@enums/admin';

export default function Table() {
  //------------------------------- States --------------------------------//
  const { adminType, items, isFetching } = useAppSelector((state) => state.admin.common);

  return (
    <table className="items-list">
      <thead>
        <tr>
          {adminType === AdminType.FEATURE && <FeatureHeaders />}
          {adminType === AdminType.TAG && <TagHeaders />}
          {adminType === AdminType.LANGUAGE && <LanguageHeaders />}
          {adminType === AdminType.REVIEW && <ReviewHeaders />}
          {[AdminType.PUBLISHER, AdminType.DEVELOPER].includes(adminType) && <CompanyHeaders />}
          {[AdminType.OFFER, AdminType.CREATE_OFFER].includes(adminType) && <OfferHeaders />}
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className={isFetching ? 'disabled' : ''}>
        {items?.map((item) => (
          <tr key={item.id}>
            {adminType === AdminType.FEATURE && isFeature(item) && <FeatureRows item={item} />}
            {adminType === AdminType.TAG && isTag(item) && <TagRows item={item} />}
            {adminType === AdminType.LANGUAGE && isLanguage(item) && <LanguageRows item={item} />}
            {adminType === AdminType.REVIEW && isReview(item) && <ReviewRows item={item} />}
            {[AdminType.PUBLISHER, AdminType.DEVELOPER].includes(adminType) && isCompany(item) && (
              <CompanyRows item={item} />
            )}
            {[AdminType.OFFER, AdminType.CREATE_OFFER].includes(adminType) && isGame(item) && (
              <OfferRows item={item} />
            )}
            <ActionsRow item={item} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
