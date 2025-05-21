import Button from '@mui/material/Button';
import './SteamIdForm.module.css';


interface SteamIdFormProps {
  steamId: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onSteamIdChange: (id: string) => void;
  onToggleOptions: () => void;
  showOptions: boolean;
}

export default function SteamIdForm({
  steamId,
  isLoading,
  onSubmit,
  onSteamIdChange,
  onToggleOptions,
  showOptions,
}: Readonly<SteamIdFormProps>) {
  return (
    <form onSubmit={onSubmit} className="steam-id-form">
      <div className="form-group">
        <label className="form-label">Your Steam ID</label>
        <input
          type="text"
          className="form-control"
          value={steamId}
          onChange={(e) => onSteamIdChange(e.target.value)}
          placeholder="Enter your Steam ID (e.g., 76561198201274371)"
          required
        />
        <small className="form-text">
          Don&#39;t know your Steam ID?{' '}
          <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer">
            Find it here
          </a>
        </small>
      </div>

      <Button
        variant="outlined"
        type="button"
        className="options-toggle"
        onClick={onToggleOptions}
      >
        {showOptions ? 'Hide Options' : 'Show Options'}
      </Button>

      <Button
        variant="contained"
        type="submit"
        className="submit-button"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Get My Games'}
      </Button>
    </form>
  );
}