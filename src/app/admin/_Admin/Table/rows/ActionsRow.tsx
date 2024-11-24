import { toast } from 'react-toastify';

import Image from 'next/image';

import {
  setCurrentEditItem,
  setDeleteItemId,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from '@store/features/admin/adminSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';

import deleteIcon from '@images/delete.png';
import editIcon from '@images/edit.png';

import type { AdminListItem } from '@custom-types/admin';

interface ActionsRowProps {
  item: AdminListItem;
}

export default function ActionsRow({ item }: ActionsRowProps) {
  const dispatch = useAppDispatch();
  const { adminType } = useAppSelector((state) => state.admin.common);

  const onEdit = (item: AdminListItem): void => {
    if (adminType !== 'review') {
      dispatch(setCurrentEditItem(item));
      dispatch(setIsEditModalOpen(true));
    } else {
      toast.error('Reviews cannot be edited');
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
