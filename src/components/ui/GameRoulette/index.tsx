import { useState } from 'react';
import { Button } from 'react-bootstrap';
import GameCard from '@/components/ui/GameCard';
import type { Game } from '@/types/types';

import './GameRoulette.module.css';

interface GameRouletteProps {
  games: Game[];
  filter: 'unplayed' | 'barely-played' | 'all';
}

export default function GameRoulette({ games, filter }: GameRouletteProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinRoulette = () => {
    if (games.length === 0) return;

    setIsSpinning(true);
    setSelectedGame(null);

    let counter = 0;
    const totalIterations = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * games.length);
      setSelectedGame(games[randomIndex]);
      counter++;

      if (counter >= totalIterations) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="game-roulette">
      <h3>
        Found {games.length} {filter === 'unplayed' ? 'unplayed' : filter === 'barely-played' ? 'barely played' : ''} games
      </h3>

      <Button
        variant="success"
        size="lg"
        onClick={spinRoulette}
        className="spin-button"
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Roulette!'}
      </Button>

      {selectedGame && (
        <GameCard
          game={selectedGame}
          className="game-result"
        />
      )}
    </div>
  );
}