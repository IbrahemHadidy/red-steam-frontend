// NextJS
import Image from 'next/image';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setCurrentEditItem,
  setDeleteItemId,
  setDiscountEndDate,
  setDiscountPrice,
  setDiscountStartDate,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setName,
  setOfferType,
  setWebsite,
} from '@store/features/admin/adminSlice';

// Toast Notifications
import { toast } from 'react-toastify';

// Utils
import get7DaysFromNow from '@utils/get7DaysFromNow';
import { isCompany, isFeature, isGame, isLanguage, isTag } from '@utils/typeGuards';

// Images
import deleteIcon from '@images/delete.png';
import editIcon from '@images/edit.png';

// Enums
import { AdminType } from '@enums/admin';

// Types
import type { AdminListItem } from '@custom-types/admin';

interface ActionsRowProps {
  item: AdminListItem;
}

export default function ActionsRow({ item }: ActionsRowProps) {
  const dispatch = useAppDispatch();
  const { adminType } = useAppSelector((state) => state.admin.common);

  const onEdit = (item: AdminListItem): void => {
    if (adminType !== AdminType.Review) {
      dispatch(setCurrentEditItem(item));
      dispatch(setIsEditModalOpen(true));
    } else {
      toast.error('Reviews cannot be edited');
    }

    if ([AdminType.Publisher, AdminType.Developer].includes(adminType) && isCompany(item)) {
      dispatch(setName(item.name));
      dispatch(setWebsite(item.website));
    }

    if (
      [AdminType.Feature, AdminType.Tag, AdminType.Language].includes(adminType) &&
      (isFeature(item) || isLanguage(item) || isTag(item))
    ) {
      dispatch(setName(item.name));
    }

    if ([AdminType.Offer, AdminType.CreateOffer].includes(adminType) && isGame(item)) {
      dispatch(setDiscountPrice(item.pricing?.price ?? ''));
      dispatch(setOfferType(item.pricing?.offerType ?? 'SPECIAL PROMOTION'));

      const discountStartDate = item.pricing?.discountStartDate
        ? new Date(item.pricing.discountStartDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      const discountEndDate = item.pricing?.discountEndDate
        ? new Date(item.pricing.discountEndDate).toISOString().split('T')[0]
        : get7DaysFromNow().toISOString().split('T')[0];

      dispatch(setDiscountStartDate(discountStartDate));
      dispatch(setDiscountEndDate(discountEndDate));
    }
  };

  const onDelete = (itemId: number): void => {
    dispatch(setDeleteItemId(itemId));
    dispatch(setIsDeleteModalOpen(true));
  };

  return (
    <td className="actions">
      <div title={`Edit ${adminType}`} onClick={() => onEdit(item)}>
        <Image src={editIcon} alt="Edit" className="edit-icon" width={18} height={18} />
      </div>

      <div title={`Delete ${adminType}`} onClick={() => onDelete(item.id)}>
        <Image src={deleteIcon} alt="Delete" className="delete-icon" width={18} height={18} />
      </div>
    </td>
  );
}
