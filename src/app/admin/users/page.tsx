'use client';

// React
import { useEffect } from 'react';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { initializeUserAdmin, reset } from '@store/features/admin/user/userAdminSlice';

// Custom Hooks
import useDynamicBackground from '@hooks/useDynamicBackground';

// Constants
import { ADMIN_BG } from '@config/constants/backgrounds';

// Components
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import Filters from './Filters';
import Pagination from './Pagination';
import Table from './Table';

export default function UsersAdmin() {
  //------------------------ Initialize User Admin ------------------------//
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeUserAdmin());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  //------------------------------- States --------------------------------//
  const { currentUsers, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.admin.user
  );

  //------------------------------- Render --------------------------------//
  useDynamicBackground(ADMIN_BG);
  return (
    <>
      <div className="items-list-container wide-list">
        <br />
        <h1 className="list-title">Users List</h1>

        <Filters />

        {currentUsers.length !== 0 ? (
          <>
            <Table />
            <Pagination />
          </>
        ) : (
          <h2 className="no-items">No users found</h2>
        )}
      </div>

      {isEditModalOpen && <EditModal />}
      {isDeleteModalOpen && <DeleteModal />}
    </>
  );
}
