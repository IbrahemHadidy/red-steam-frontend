'use client';

// React
import { useCallback, useEffect, useMemo, useState } from 'react';

// NextJS
import Image from 'next/image';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import DeleteModal from '@app/admin/_Admin/DeleteModal';
import EditModal from '@app/admin/_Admin/EditModal';

// Services
import { getUsersPaginated } from '@services/user/admin';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Utils
import debounce from '@utils/debounce';
import formatDate from '@utils/formatDate';

// Images
import deleteIcon from '@images/delete.png';
import editIcon from '@images/edit.png';

// Types
import type { User } from '@entities/user.entity';
import type { ChangeEvent, FC, JSX } from 'react';
type Sort = 'username' | 'email' | 'country' | 'isVerified' | 'isAdmin' | 'createdAt';

const UsersAdmin: FC = (): JSX.Element => {
  // Init
  useDynamicBackground(`#181A21`);

  // States
  const [users, setUsers] = useState<User[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{
    key: Sort;
    direction: 'ASC' | 'DESC';
  }>({ key: 'username', direction: 'ASC' });
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: string }>({});
  const [disabled, setDisabled] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<User>();
  const [deleteUserId, setDeleteUserId] = useState<string>();

  // Fetch users
  const fetchUsersData = useCallback(async () => {
    const data = await getUsersPaginated(
      currentPage,
      usersPerPage,
      sortConfig.key,
      sortConfig.direction,
      searchQuery
    );
    setUsers(data.items);
    setTotalPages(data.totalPages);
    setDisabled(false);
  }, [currentPage, searchQuery, sortConfig, usersPerPage]);

  // Debounce the fetchUsersData function
  const debouncedFetchUsersData = useMemo(() => debounce(fetchUsersData, 500), [fetchUsersData]);

  // Fetch users on mount or when search query changes or edit or delete modal close
  useEffect(() => {
    if (!editModalOpen && !deleteModalOpen) {
      setDisabled(true);
      debouncedFetchUsersData();

      // Cleanup function to cancel any pending debounced function call
      return () => {
        debouncedFetchUsersData.cancel();
      };
    }
  }, [debouncedFetchUsersData, editModalOpen, deleteModalOpen]);

  // Pagination handling
  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getSortArrow = (key: Sort): string => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ASC' ? '▲' : '▼';
    }
    return '';
  };

  // Handle items per page change
  const handleUsersPerPageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  // Handle search query change for multiple fields
  const handleSearchQueryChange = (field: string, value: string): void => {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const sortItems = (key: Sort): void => {
    setSortConfig((prevSortConfig) => {
      // Check if the same key is clicked, then toggle the direction
      if (prevSortConfig?.key === key) {
        // Toggle the sorting direction
        const newDirection: 'ASC' | 'DESC' = prevSortConfig.direction === 'ASC' ? 'DESC' : 'ASC';
        return { key, direction: newDirection };
      }

      // Otherwise, set a new sorting key with ascending order
      return { key, direction: 'ASC' };
    });
  };

  const copyToClipboard = (type: string, value: string): void => {
    navigator.clipboard.writeText(value);
    toast.success(`${type} copied to clipboard`);
  };

  const onEdit = (user: User): void => {
    setEditUser(user);
    setEditModalOpen(true);
  };

  const onDelete = (userId: string): void => {
    setDeleteUserId(userId);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div className="items-list-container wide-list">
        <br />
        <h1 className="list-title">Users List</h1>
        <div className="filters">
          <div className="search-box">
            <div>
              <label htmlFor="searchUsername">Search by Username:</label>
              <input
                type="text"
                id="searchUsername"
                value={searchQuery.name}
                onChange={(e) => handleSearchQueryChange('username', e.target.value)}
                placeholder="Search by Username"
              />
            </div>
            <div>
              <label htmlFor="searchEmail">Search by Email:</label>
              <input
                type="text"
                id="searchEmail"
                value={searchQuery.name}
                onChange={(e) => handleSearchQueryChange('email', e.target.value)}
                placeholder="Search by Email"
              />
            </div>
          </div>
          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Items per page:</label>
            <select id="itemsPerPage" value={usersPerPage} onChange={handleUsersPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <table className="items-list">
          <thead>
            <tr>
              <th className="user-id">ID</th>
              <th onClick={() => sortItems('username')}>Username {getSortArrow('username')}</th>
              <th onClick={() => sortItems('email')}>Email {getSortArrow('email')}</th>
              <th className="mini" onClick={() => sortItems('country')}>
                Country {getSortArrow('country')}
              </th>
              <th className="mini" onClick={() => sortItems('isVerified')}>
                Verified {getSortArrow('isVerified')}
              </th>
              <th className="mini" onClick={() => sortItems('isAdmin')}>
                Admin {getSortArrow('isAdmin')}
              </th>
              <th className="created-at" onClick={() => sortItems('createdAt')}>
                Created at {getSortArrow('createdAt')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={disabled ? 'disabled' : ''}>
            {users?.map((user) => (
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

        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>

          <span>
            Page &nbsp;
            <select value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))}>
              {Array.from({ length: totalPages }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            &nbsp; of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {editModalOpen && editUser && (
        <EditModal type="user" setOpen={setEditModalOpen} item={editUser} />
      )}
      {deleteModalOpen && deleteUserId && (
        <DeleteModal type="user" setOpen={setDeleteModalOpen} itemId={deleteUserId} />
      )}
    </>
  );
};

export default UsersAdmin;
