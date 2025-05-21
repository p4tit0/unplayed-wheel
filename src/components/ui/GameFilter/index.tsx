import './GameFilter.module.css';

interface GameFilterProps {
  filter: 'unplayed' | 'barely-played' | 'all';
  onFilterChange: (filter: 'unplayed' | 'barely-played' | 'all') => void;
}

export default function GameFilter({ filter, onFilterChange }: GameFilterProps) {
  return (
    <div className="game-filter">
      <label>Game Selection Filter</label>
      <div className="toggle-button-group">
        {(['unplayed', 'barely-played', 'all'] as const).map((option) => (
          <button
            key={option}
            type="button"
            className={`toggle-button ${filter === option ? 'active' : ''}`}
            onClick={() => onFilterChange(option)}
          >
            {option === 'unplayed' ? 'Unplayed Only' : 
             option === 'barely-played' ? 'Barely Played (<2h)' : 'All Games'}
          </button>
        ))}
      </div>
    </div>
  );
}