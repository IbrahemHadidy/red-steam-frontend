// React
import { useCallback, useEffect, useMemo, useState } from 'react';

// Next
import Image from 'next/image';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

// Services
import { getDevelopersPaginated } from '@services/common/developers';
import { getFeaturesPaginated } from '@services/common/features';
import { getLanguagesPaginated } from '@services/common/languages';
import { getPublishersPaginated } from '@services/common/publishers';
import { getReviewsPaginated } from '@services/common/reviews';
import { getTagsPaginated } from '@services/common/tags';
import { getOffersPaginated } from '@services/game/offer';

// Utils
import convertToBase64Image from '@utils/convertToBase64Image';
import debounce from '@utils/debounce';
import formatDate from '@utils/formatDate';
import { isCompany, isFeature, isPricing, isReview } from '@utils/typeGuards';

// Images
import deleteIcon from '@images/delete.png';
import editIcon from '@images/edit.png';
import negativeIcon from '@images/negative.png';
import positiveIcon from '@images/positive.png';

// Types
import type { ChangeEvent, FC, JSX } from 'react';
import type { Item, ItemsListProps } from './admin.types';

const ItemsList: FC<ItemsListProps> = ({ type, submitted }): JSX.Element => {
  // States
  const [items, setItems] = useState<Item[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ASC' | 'DESC';
  }>({ key: 'id', direction: 'ASC' });
  const [searchQuery, setSearchQuery] = useState<{ [key: string]: string }>({});
  const [disabled, setDisabled] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<Item>();
  const [deleteItemId, setDeleteItemId] = useState<number>();

  const getPaginatedItems = useCallback(
    async (
      page: number,
      sortBy: string,
      direction: 'ASC' | 'DESC',
      itemsPerPage: number = 10,
      searchQuery: { [key: string]: string }
    ): Promise<{
      items: Item[];
      totalPages: number;
    }> => {
      // Mapping of type to fetch function
      const fetchFunctions = {
        feature: getFeaturesPaginated,
        developer: getDevelopersPaginated,
        publisher: getPublishersPaginated,
        tag: getTagsPaginated,
        language: getLanguagesPaginated,
        review: getReviewsPaginated,
        offer: getOffersPaginated,
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
    if (!editModalOpen && !deleteModalOpen) {
      setDisabled(true);
      debouncedFetchItemsData();

      // Cleanup function to cancel any pending debounced function call
      return () => {
        debouncedFetchItemsData.cancel();
      };
    }
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

  const sortItems = (key: string): void => {
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

  const onEdit = (item: Item): void => {
    if (type !== 'review') {
      setEditItem(item);
      setEditModalOpen(true);
    } else {
      toast.error('Reviews cannot be edited');
    }
  };

  const onDelete = (itemId: number): void => {
    setDeleteItemId(itemId);
    setDeleteModalOpen(true);
  };

  // List title
  const listTitle: JSX.Element =
    type === 'offer' ? (
      <h1 className="list-title">Current Offers</h1>
    ) : (
      <h1 className="list-title">{type.charAt(0).toUpperCase() + type.slice(1)}s List</h1>
    );

  // Pagination
  const pagination: JSX.Element = (
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
  );

  const itemsPerPageOptions: JSX.Element = (
    <div className="items-per-page">
      <label htmlFor="itemsPerPage">Items per page:</label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );

  // Filters
  const searchByName: JSX.Element = (
    <div>
      <label htmlFor="searchName">Search by Name: </label>
      <input
        type="text"
        id="searchName"
        value={searchQuery.name}
        onChange={(e) => handleSearchQueryChange('name', e.target.value)}
        placeholder="Search by Name"
      />
    </div>
  );
  const searchByGame: JSX.Element = (
    <div>
      <label htmlFor="searchGameName">Search by Game: </label>
      <input
        type="text"
        id="searchGameName"
        value={searchQuery.name}
        onChange={(e) => handleSearchQueryChange('gameName', e.target.value)}
        placeholder="Search by Game"
      />
    </div>
  );
  const searchByWebsite: JSX.Element = (
    <div>
      <label htmlFor="searchWebsite">Search by Website: </label>
      <input
        type="text"
        id="searchWebsite"
        value={searchQuery.description}
        onChange={(e) => handleSearchQueryChange('website', e.target.value)}
        placeholder="Search by Website"
      />
    </div>
  );
  const searchByUser: JSX.Element = (
    <div>
      <label htmlFor="searchUsername">Search by User: </label>
      <input
        type="text"
        id="searchUsername"
        value={searchQuery.description}
        onChange={(e) => handleSearchQueryChange('username', e.target.value)}
        placeholder="Search by User"
      />
    </div>
  );
  const searchByContent: JSX.Element = (
    <div>
      <label htmlFor="searchWebsite">Search by Content: </label>
      <input
        type="text"
        id="searchContent"
        value={searchQuery.description}
        onChange={(e) => handleSearchQueryChange('content', e.target.value)}
        placeholder="Search by Content"
      />
    </div>
  );

  const filters: JSX.Element = (
    <div className="filters">
      <div className="search-box">
        {type === 'offer' && searchByGame}
        {!['review', 'offer'].includes(type) && searchByName}
        {['developer', 'publisher'].includes(type) && searchByWebsite}
        {type === 'review' && (
          <>
            {searchByUser}
            {searchByGame}
            {searchByContent}
          </>
        )}
      </div>

      {itemsPerPageOptions}
    </div>
  );

  // Table head
  const idHeader: JSX.Element = (
    <th className={`${type === 'offer' ? 'offer' : ''}`} onClick={() => sortItems('id')}>
      {type === 'offer' ? 'Game ID' : 'ID'} {getSortArrow('id')}
    </th>
  );
  const iconHeader: JSX.Element = <th className="icon">Icon</th>;
  const nameHeader: JSX.Element = (
    <th onClick={() => sortItems('name')}>Name {getSortArrow('name')}</th>
  );
  const websiteHeader: JSX.Element = (
    <th onClick={() => sortItems('website')}>Website {getSortArrow('website')}</th>
  );
  const userHeader: JSX.Element = (
    <th onClick={() => sortItems('user')}>User {getSortArrow('user')}</th>
  );
  const gameHeader: JSX.Element = (
    <th onClick={() => sortItems('game')}>Game {getSortArrow('game')}</th>
  );
  const reviewContentHeader: JSX.Element = (
    <th onClick={() => sortItems('content')}>Content {getSortArrow('content')}</th>
  );
  const reviewRatingHeader: JSX.Element = (
    <th className="center" onClick={() => sortItems('rating')}>
      Rating {getSortArrow('rating')}
    </th>
  );
  const basePriceHeader: JSX.Element = (
    <th className="center" onClick={() => sortItems('basePrice')}>
      Base Price {getSortArrow('basePrice')}
    </th>
  );
  const discoundPriceHeader: JSX.Element = (
    <th className="center" onClick={() => sortItems('discountPrice')}>
      Discount Price {getSortArrow('discountPrice')}
    </th>
  );
  const discountPercentageHeader: JSX.Element = (
    <th className="center" onClick={() => sortItems('discountPercentage')}>
      Discount Percentage {getSortArrow('discountPercentage')}
    </th>
  );
  const offerType: JSX.Element = (
    <th className="center" onClick={() => sortItems('offerType')}>
      Offer Type {getSortArrow('offerType')}
    </th>
  );
  const discountStartDateHeader: JSX.Element = (
    <th className="center" onClick={() => sortItems('discountStartDate')}>
      Start Date {getSortArrow('discountStartDate')}
    </th>
  );
  const discountEndDateHeader: JSX.Element = (
    <th className="center" onClick={() => sortItems('discountEndDate')}>
      End Date {getSortArrow('discountEndDate')}
    </th>
  );
  const actionsHeader: JSX.Element = <th>Actions</th>;

  const tableHead: JSX.Element = (
    <thead>
      <tr>
        {idHeader}
        {type === 'feature' && iconHeader}
        {type !== 'review' && type !== 'offer' && nameHeader}
        {['developer', 'publisher'].includes(type) && websiteHeader}
        {type === 'review' && (
          <>
            {userHeader}
            {gameHeader}
            {reviewContentHeader}
            {reviewRatingHeader}
          </>
        )}
        {type === 'offer' && (
          <>
            {gameHeader}
            {basePriceHeader}
            {discoundPriceHeader}
            {discountPercentageHeader}
            {offerType}
            {discountStartDateHeader}
            {discountEndDateHeader}
          </>
        )}
        {actionsHeader}
      </tr>
    </thead>
  );

  // Table body
  const idRow = (item: Item): JSX.Element => {
    return <td>{type === 'offer' ? (isPricing(item) ? item.game?.id : '') : item.id}</td>;
  };
  const iconRow = (item: Item): JSX.Element => {
    if (isFeature(item)) {
      return (
        <td className="icon">
          <img src={convertToBase64Image(item.icon.data)} alt={item.name} />
        </td>
      );
    } else {
      return <></>;
    }
  };
  const nameRow = (item: Item): JSX.Element => {
    if (!isPricing(item) && !isReview(item)) {
      return (
        <td
          className="copy-to-clipboard"
          title="Copy to clipboard"
          onClick={() => copyToClipboard('Name', item.name)}
        >
          {item.name}
        </td>
      );
    } else {
      return <></>;
    }
  };
  const websiteRow = (item: Item): JSX.Element => {
    if (isCompany(item)) {
      return (
        <td
          className="copy-to-clipboard"
          title="Copy to clipboard"
          onClick={() => copyToClipboard('Website', item.website)}
        >
          {item.website}
        </td>
      );
    } else {
      return <></>;
    }
  };
  const userRow = (item: Item): JSX.Element => {
    if (isReview(item)) {
      return (
        <td
          className="copy-to-clipboard"
          title="Copy to clipboard"
          onClick={() => copyToClipboard('Username', item.user?.username ?? '')}
        >
          {item.user?.username}
        </td>
      );
    } else {
      return <></>;
    }
  };
  const gameRow = (item: Item): JSX.Element => {
    if (isReview(item)) {
      return (
        <td
          className="copy-to-clipboard"
          title="Copy to clipboard"
          onClick={() => item.game?.name && copyToClipboard('Game name', item.game.name)}
        >
          {item.game?.name && item.game.name}
        </td>
      );
    } else {
      return <></>;
    }
  };
  const reviewContentRow = (item: Item): JSX.Element => {
    if (isReview(item)) {
      return (
        <td
          className="copy-to-clipboard"
          title="Copy to clipboard"
          onClick={() => copyToClipboard('Content', item.content)}
        >
          {item.content}
        </td>
      );
    } else {
      return <></>;
    }
  };
  const reviewRatingRow = (item: Item): JSX.Element => {
    if (isReview(item)) {
      return (
        <td>
          {item.positive ? (
            <Image src={positiveIcon} alt="Positive" width={18} height={18} />
          ) : (
            <Image src={negativeIcon} alt="Negative" width={18} height={18} />
          )}
        </td>
      );
    } else {
      return <></>;
    }
  };
  const basePriceRow = (item: Item): JSX.Element => {
    if (isPricing(item)) {
      return <td>${item.basePrice} USD</td>;
    } else {
      return <></>;
    }
  };
  const discountPriceRow = (item: Item): JSX.Element => {
    if (isPricing(item)) {
      return <td>${item.discountPrice} USD</td>;
    } else {
      return <></>;
    }
  };
  const discountPercentageRow = (item: Item): JSX.Element => {
    if (isPricing(item)) {
      return <td>{item.discountPercentage}%</td>;
    } else {
      return <></>;
    }
  };
  const offerTypeRow = (item: Item): JSX.Element => {
    if (isPricing(item)) {
      return <td>{item.offerType}</td>;
    } else {
      return <></>;
    }
  };
  const discountStartDateRow = (item: Item): JSX.Element => {
    if (isPricing(item)) {
      return <td>{formatDate(item.discountStartDate)}</td>;
    } else {
      return <></>;
    }
  };
  const discountEndDateRow = (item: Item): JSX.Element => {
    if (isPricing(item)) {
      return <td>{formatDate(item.discountEndDate)}</td>;
    } else {
      return <></>;
    }
  };
  const actionsRow = (item: Item): JSX.Element => (
    <td className="actions">
      <div title={`Edit ${type}`} onClick={() => onEdit(item)}>
        <Image src={editIcon} alt="Edit" className="edit-icon" width={18} height={18} />
      </div>

      <div title={`Delete ${type}`} onClick={() => onDelete(item.id)}>
        <Image src={deleteIcon} alt="Delete" className="delete-icon" width={18} height={18} />
      </div>
    </td>
  );

  const tableBody: JSX.Element = (
    <tbody className={disabled ? 'disabled' : ''}>
      {items?.map((item) => (
        <tr key={item.id}>
          {idRow(item)}
          {type === 'feature' && iconRow(item)}
          {type !== 'review' && nameRow(item)}
          {['developer', 'publisher'].includes(type) && websiteRow(item)}
          {type === 'review' && isReview(item) && (
            <>
              {userRow(item)}
              {gameRow(item)}
              {reviewContentRow(item)}
              {reviewRatingRow(item)}
            </>
          )}
          {type === 'offer' && (
            <>
              {basePriceRow(item)}
              {discountPriceRow(item)}
              {discountPercentageRow(item)}
              {offerTypeRow(item)}
              {discountStartDateRow(item)}
              {discountEndDateRow(item)}
            </>
          )}
          {actionsRow(item)}
        </tr>
      ))}
    </tbody>
  );

  return (
    <>
      <div className={`items-list-container ${type === 'offer' ? 'wide-list' : ''}`}>
        <hr />
        {listTitle}
        {filters}

        <table className="items-list">
          {tableHead}
          {tableBody}
        </table>
        {pagination}
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
