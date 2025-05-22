"use client"
import axios from 'axios';
import { useState } from 'react';
import SteamIdForm from '@/components/form/SteamIdForm';
import GameFilter from '@/components/ui/GameFilter';
import GameRoulette from '@/components/ui/GameRoulette';
import AlertMessage from '@/components/ui/AlertMessage';
import type { Game, SteamGamesResponse } from '@/types/types';

export default function Home() {
  const proxyUrl = process.env.NEXT_PUBLIC_PROXY_URL;
  if (!proxyUrl) {
    throw new Error('Proxy URL is not set. Please set the NEXT_PUBLIC_PROXY_URL environment variable.');
  }


  const [steamId, setSteamId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [gameFilter, setGameFilter] = useState<'unplayed' | 'barely-played' | 'all'>('unplayed');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGames([]);

    try {
      const response = await axios.get<SteamGamesResponse>(
        proxyUrl,
        {
          params: {
            steamid: steamId // Apenas o steamid é necessário agora
          }
        }
      );

      if (!response.data.response?.games) {
        setError('Game list is not public. Please update your Steam privacy settings.');
        return;
      }

      let filteredGames = response.data.response.games;

      if (gameFilter === 'unplayed') {
        filteredGames = filteredGames.filter(game => game.playtime_forever === 0);
      } else if (gameFilter === 'barely-played') {
        filteredGames = filteredGames.filter(game => game.playtime_forever > 0 && game.playtime_forever < 120);
      }

      if (filteredGames.length === 0) {
        setError(`No games found matching your criteria (${gameFilter}). Try a different filter.`);
        return;
      }

      setGames(filteredGames);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to fetch games: ${err.message}`);
        console.error('Axios error details:', err.response?.data);
      } else {
        setError('Failed to fetch games. Please check your Steam ID and try again.');
        console.error('Unexpected error:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">

      <div className="page-content">
        <div className="main-content">
          <h1 className="page-title">Steam Game Roulette</h1>
          
          <SteamIdForm
            steamId={steamId}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onSteamIdChange={setSteamId}
            onToggleOptions={() => setShowOptions(!showOptions)}
            showOptions={showOptions}
          />

          {showOptions && (
            <GameFilter
              filter={gameFilter}
              onFilterChange={setGameFilter}
            />
          )}

          <AlertMessage message={error} />

          {games.length > 0 && (
            <GameRoulette
              games={games}
              filter={gameFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
}