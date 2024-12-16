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
  const { adminType, items, isFetching } = useAppSelector((state) => state.admin.common);

  return (
    <table className="items-list">
      <thead>
        <tr>
          {adminType === AdminType.Feature && <FeatureHeaders />}
          {adminType === AdminType.Tag && <TagHeaders />}
          {adminType === AdminType.Language && <LanguageHeaders />}
          {adminType === AdminType.Review && <ReviewHeaders />}
          {[AdminType.Publisher, AdminType.Developer].includes(adminType) && <CompanyHeaders />}
          {[AdminType.Offer, AdminType.CreateOffer].includes(adminType) && <OfferHeaders />}
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className={isFetching ? 'disabled' : ''}>
        {items?.map((item) => (
          <tr key={item.id}>
            {adminType === AdminType.Feature && isFeature(item) && <FeatureRows item={item} />}
            {adminType === AdminType.Tag && isTag(item) && <TagRows item={item} />}
            {adminType === AdminType.Language && isLanguage(item) && <LanguageRows item={item} />}
            {adminType === AdminType.Review && isReview(item) && <ReviewRows item={item} />}
            {[AdminType.Publisher, AdminType.Developer].includes(adminType) && isCompany(item) && (
              <CompanyRows item={item} />
            )}
            {[AdminType.Offer, AdminType.CreateOffer].includes(adminType) && isGame(item) && (
              <OfferRows item={item} />
            )}
            <ActionsRow item={item} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
