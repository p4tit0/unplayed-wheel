import Image from 'next/image';
import './GameCard.module.css';

interface GameCardProps {
  game: {
    appid: number;
    name: string;
    playtime_forever: number;
    img_icon_url: string;
  };
  className?: string;
}

export default function GameCard({ game, className }: GameCardProps) {
  return (
    <div className={`game-card ${className || ''} fade-in`}>
      <h2>You should play:</h2>
      <h3>{game.name}</h3>
      {game.img_icon_url && (
        <div className="game-image">
          <Image
            src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
            alt={game.name}
            fill
          />
        </div>
      )}
      <p className="playtime">
        {game.playtime_forever === 0 ? (
          <span className="never-played">Never played!</span>
        ) : (
          <span>Playtime: {Math.floor(game.playtime_forever / 60)}h {game.playtime_forever % 60}m</span>
        )}
      </p>
    </div>
  );
}