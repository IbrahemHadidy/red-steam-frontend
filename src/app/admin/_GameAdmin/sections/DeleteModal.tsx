// NextJS
import { useRouter } from 'next/navigation';

// Redux Hooks
import { useAppDispatch } from '@store/hooks';

// Redux thunks
import { deleteGame } from '@store/features/admin/game/gameAdminThunks';

interface DeleteModalProps {
  gameId: number;
  gameName: string;
  setOpen: (open: boolean) => void;
}

export default function DeleteModal({ gameId, gameName, setOpen }: DeleteModalProps) {
  //--------------------------- Initializations --------------------------//
  const router = useRouter();
  const dispatch = useAppDispatch();

  //--------------------------- Functions --------------------------//
  const deleteItem = async () => {
    await dispatch(deleteGame({ id: gameId, router })).unwrap();
  };

  return (
    <>
      <div className="modal-overlay" onClick={() => setOpen(false)} />
      <div className="delete-modal">
        <h2>Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the game: <b>{gameName}</b>? This action will permanently
          remove it from every user's library.
        </p>

        <div className="modal-actions">
          <button onClick={deleteItem}>Confirm</button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </div>
    </>
  );
}
