// React
import { useCallback, useEffect, useMemo, useState } from 'react';

// Next
import Image from 'next/image';

// Components
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

// Services
import { getDevelopersPaginated } from 'services/common/developers';
import { getFeaturesPaginated } from 'services/common/features';
import { getLanguagesPaginated } from 'services/common/languages';
import { getPublishersPaginated } from 'services/common/publishers';
import { getTagsPaginated } from 'services/common/tags';

// Utils
import debounce from 'utils/debounce';

// Images
import deleteIcon from 'images/delete.png';
import editIcon from 'images/edit.png';

// Types
import type { ChangeEvent, FC, JSX } from 'react';
import type { Company } from 'types/company.types';
import type { Feature } from 'types/feature.types';
import type { Item, ItemsListProps } from './admin.types';

const ItemsList: FC<ItemsListProps> = ({ type, submitted }): JSX.Element => {
  // States
  const [items, setItems] = useState<Item[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{
    key: 'id' | 'name' | 'website';
    direction: 'ASC' | 'DESC';
  }>({ key: 'id', direction: 'ASC' });
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: string }>({
    name: '',
    website: '',
  });
  const [disabled, setDisabled] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<Item>();
  const [deleteItemId, setDeleteItemId] = useState<number>();

  const getPaginatedItems = useCallback(
    async (
      page: number,
      sortBy: 'id' | 'name' | 'website',
      direction: 'ASC' | 'DESC',
      itemsPerPage: number = 10,
      searchQuery: { [key: string]: string }
    ): Promise<{
      items: Item[];
      totalPages: number;
    }> => {
      // Create a mapping between the type and the corresponding paginated function
      const fetchFunctions = {
        feature: getFeaturesPaginated,
        developer: getDevelopersPaginated,
        publisher: getPublishersPaginated,
        tag: getTagsPaginated,
        language: getLanguagesPaginated,
      };

      // Check if the type exists in the mapping
      const fetchFunction = fetchFunctions[type];

      if (fetchFunction) {
        // Call the respective function based on the type
        return await fetchFunction(
          page,
          itemsPerPage,
          sortBy as keyof Item,
          direction,
          searchQuery
        );
      }

      // Handle the default case or if type doesn't match
      return await Promise.resolve({ items: [], totalPages: 0 });
    },
    [type]
  );

  // Fetch items
  const fetchItemsData = useCallback(async () => {
    const data: { items: Item[]; totalPages: number } = await getPaginatedItems(
      currentPage,
      sortConfig.key,
      sortConfig.direction,
      itemsPerPage,
      searchQuery
    );
    setItems(data.items);
    setTotalPages(data.totalPages);
    setDisabled(false);
  }, [
    currentPage,
    getPaginatedItems,
    itemsPerPage,
    searchQuery,
    sortConfig.direction,
    sortConfig.key,
  ]);

  // Debounce the fetchItemsData function
  const debouncedFetchItemsData = useMemo(() => debounce(fetchItemsData, 500), [fetchItemsData]);

  // Fetch items on mount or when search query changes or edit or delete modal close
  useEffect(() => {
    setDisabled(true);
    debouncedFetchItemsData();

    // Cleanup function to cancel any pending debounced function call
    return () => {
      debouncedFetchItemsData.cancel();
    };
  }, [debouncedFetchItemsData, editModalOpen, deleteModalOpen, submitted]);

  // Pagination handling
  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getSortArrow = (key: string): string => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ASC' ? '▲' : '▼';
    }
    return '';
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(e.target.value));
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

  const sortItems = (key: 'id' | 'name' | 'website'): void => {
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

  const onEdit = (item: Item): void => {
    setEditItem(item);
    setEditModalOpen(true);
  };

  const onDelete = (itemId: number): void => {
    setDeleteItemId(itemId);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div className="items-list-container">
        <hr />
        <h1 className="list-title">{type.charAt(0).toUpperCase() + type.slice(1)}s List</h1>
        <div className="filters">
          <div className="search-box">
            <div>
              <label htmlFor="searchName">Search by Name:</label>
              <input
                type="text"
                id="searchName"
                value={searchQuery.name}
                onChange={(e) => handleSearchQueryChange('name', e.target.value)}
                placeholder="Search by Name"
              />
            </div>
            {type === ('developer' || 'publisher') && (
              <div>
                <label htmlFor="searchWebsite">Search by Website:</label>
                <input
                  type="text"
                  id="searchWebsite"
                  value={searchQuery.description}
                  onChange={(e) => handleSearchQueryChange('website', e.target.value)}
                  placeholder="Search by Website"
                />
              </div>
            )}
          </div>

          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Items per page:</label>
            <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
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
              <th onClick={() => sortItems('id')}>ID {getSortArrow('id')}</th>
              {type === 'feature' && <th className="icon">Icon</th>}
              <th onClick={() => sortItems('name')}>Name {getSortArrow('name')}</th>
              {type === ('developer' || 'publisher') && (
                <th onClick={() => sortItems('website')}>Website {getSortArrow('website')}</th>
              )}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className={disabled ? 'disabled' : ''}>
            {items?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {type === 'feature' && (
                  <td className="icon">
                    <img
                      src={`data:image/png;base64,${Buffer.from((item as Feature).icon.data).toString('base64')}`}
                      alt={item.name}
                    />
                  </td>
                )}
                <td>{item.name}</td>
                {type === ('developer' || 'publisher') && (item as Company).website && (
                  <td>{(item as Company).website}</td>
                )}
                <td className="actions">
                  <div title={`Edit ${type}`} onClick={() => onEdit(item)}>
                    <Image src={editIcon} alt="Edit" className="edit-icon" width={18} height={18} />
                  </div>

                  <div title={`Delete ${type}`} onClick={() => onDelete(item.id)}>
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
      {editModalOpen && editItem && (
        <EditModal type={type} setOpen={setEditModalOpen} item={editItem} />
      )}
      {deleteModalOpen && deleteItemId && (
        <DeleteModal type={type} setOpen={setDeleteModalOpen} itemId={deleteItemId} />
      )}
    </>
  );
};

export default ItemsList;
