// React
import { useCallback } from 'react';

// Toast notifications
import { toast } from 'react-toastify';

// Services
import { deleteDeveloper } from 'services/common/developers';
import { deleteFeature } from 'services/common/features';
import { deleteLanguage } from 'services/common/languages';
import { deletePublisher } from 'services/common/publishers';
import { deleteTag } from 'services/common/tags';

// Types
import type { FC, JSX } from 'react';
import type { DeleteModalProps } from './admin.types';

const DeleteModal: FC<DeleteModalProps> = ({ type, setOpen, itemId }): JSX.Element => {
  const deleteItem = useCallback(async (): Promise<void> => {
    // Create a mapping between the type and the corresponding delete function
    const deleteFunctions = {
      feature: deleteFeature,
      developer: deleteDeveloper,
      publisher: deletePublisher,
      tag: deleteTag,
      language: deleteLanguage,
    };

    // Check if the type exists in the mapping
    const deleteFunction = deleteFunctions[type];
    if (deleteFunction) {
      // Call the respective function based on the type
      const message: string = (await deleteFunction(itemId)).message;
      toast.success(message);
      setOpen(false);
      return;
    }

    // Handle the default case or if type doesn't match
    toast.error('Failed to delete item');
    setOpen(false);
    return;
  }, [itemId, setOpen, type]);

  return (
    <>
      <div className="modal-overlay" onClick={() => setOpen(false)} />
      <div className="delete-modal">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete this {type}? This action will permanently remove it from
          all games that use it.
        </p>
        <div className="modal-actions">
          <button onClick={deleteItem}>Confirm</button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
