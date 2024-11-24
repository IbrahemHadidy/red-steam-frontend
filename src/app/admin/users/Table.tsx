// NextJS
import Image from 'next/image';

// Toast notifications
import { toast } from 'react-toastify';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setCurrentEditUser,
  setDeleteUserId,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setSortConfig,
} from '@store/features/admin/user/userAdminSlice';

// Utils
import formatDate from '@utils/formatDate';
import getSortArrow from '../_Admin/utils/getSortArrow';
import sortItems from '../_Admin/utils/sortItems';

// Images
import deleteIcon from '@images/delete.png';
import editIcon from '@images/edit.png';

// Types
import type { UserSort, UserSortConfig } from '@custom-types/admin';
import type { User } from '@interfaces/user';
import type { SortArrow } from '../_Admin/utils/getSortArrow';

export default function Table() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentUsers, sortConfig, isFetching } = useAppSelector((state) => state.admin.user);

  //--------------------------- Event Handlers ----------------------------//
  const copyToClipboard = (type: string, value: string): void => {
    navigator.clipboard.writeText(value);
    toast.success(`${type} copied to clipboard`);
  };

  const onEdit = (user: User): void => {
    dispatch(setCurrentEditUser(user));
    dispatch(setIsEditModalOpen(true));
  };

  const onDelete = (userId: string): void => {
    dispatch(setDeleteUserId(userId));
    dispatch(setIsDeleteModalOpen(true));
  };

  const sortArrow = (key: string): SortArrow => {
    return getSortArrow(key, sortConfig);
  };

  const sortBykey = (key: UserSort): void => {
    const sortedItems = sortItems(key, sortConfig);
    if (Object.values(sortedItems).includes(key)) {
      dispatch(setSortConfig(sortedItems as UserSortConfig));
    }
  };

  //------------------------------- Render --------------------------------//
  return (
    <table className="items-list">
      <thead>
        <tr>
          <th className="user-id">ID</th>

          <th onClick={() => sortBykey('username')}>Username {sortArrow('username')}</th>

          <th onClick={() => sortBykey('email')}>Email {sortArrow('email')}</th>

          <th className="mini" onClick={() => sortBykey('country')}>
            Country {sortArrow('country')}
          </th>

          <th className="mini" onClick={() => sortBykey('isVerified')}>
            Verified {sortArrow('isVerified')}
          </th>

          <th className="mini" onClick={() => sortBykey('isAdmin')}>
            Admin {sortArrow('isAdmin')}
          </th>

          <th className="created-at" onClick={() => sortBykey('createdAt')}>
            Created at {sortArrow('createdAt')}
          </th>

          <th>Actions</th>
        </tr>
      </thead>

      <tbody className={isFetching ? 'disabled' : ''}>
        {currentUsers?.map((user) => (
          <tr key={user.id}>
            <td
              className="copy-to-clipboard user-id"
              title="Copy to clipboard"
              onClick={() => copyToClipboard('ID', user.id)}
            >
              Copy
            </td>

            <td
              className="copy-to-clipboard"
              title="Copy to clipboard"
              onClick={() => copyToClipboard('Username', user.username)}
            >
              {user.username}
            </td>

            <td
              className="copy-to-clipboard"
              title="Copy to clipboard"
              onClick={() => copyToClipboard('Email', user.email)}
            >
              {user.email}
            </td>

            <td className="center">{user.country}</td>

            <td className="center">{user.isVerified ? 'Yes' : 'No'}</td>

            <td className="center">{user.isAdmin ? 'Yes' : 'No'}</td>

            <td className="center">{formatDate(user.createdAt)}</td>

            <td className="actions">
              <div title="Edit User" onClick={() => onEdit(user)}>
                <Image src={editIcon} alt="Edit" className="edit-icon" width={18} height={18} />
              </div>

              <div title="Delete User" onClick={() => onDelete(user.id)}>
                <Image
                  src={deleteIcon}
                  alt="Delete"
                  className="delete-icon"
                  width={18}
                  height={18}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
