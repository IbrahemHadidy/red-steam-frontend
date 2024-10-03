'use client';

// React
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// NextJS
import { useRouter } from 'next/navigation';

// Toast notifications
import { toast } from 'react-toastify';

// Components
import GameAdmin from '@app/admin/_GameAdmin/GameAdmin';
import Loading from '@app/loading';

// Services
import { getById } from '@services/game/data';

// Types
import type { Game } from '@entities/game.entity';
import type { JSX } from 'react';
interface GameUpdateProps {
  params: { id: string };
}

export default function GameUpdate({ params }: GameUpdateProps): JSX.Element {
  const router = useRouter();

  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadingPortal = document.getElementById('loading-portal');

  useEffect(() => {
    const fetchGame = async (): Promise<void> => {
      const fetchedGame: Game | undefined = await getById(+params.id);
      if (fetchedGame) {
        setGame(fetchedGame);
        setIsLoading(false);
      } else {
        toast.error('Game not found');
        router.push('/not-found');
      }
    };
    fetchGame();
  }, [params.id, router]);

  return isLoading && loadingPortal ? (
    createPortal(<Loading />, loadingPortal)
  ) : (
    <GameAdmin type="update" game={game} />
  );
}
