import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AvatarTile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface AvatarTileProps {
  initialAvatarUrl: string;
  loading: boolean;
  onRefresh: () => void;
}

const AvatarTile: React.FC<AvatarTileProps> = ({ initialAvatarUrl, loading, onRefresh }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(initialAvatarUrl);

  useEffect(() => {
    setAvatarUrl(initialAvatarUrl);
  }, [initialAvatarUrl]);

  return (
    <div className="avatar-tile">
      {loading ? (
        <div className="loading-spinner">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : (
        <img src={avatarUrl} alt="avatar" className="avatar-img" />
      )}
      <button className="refresh-btn" onClick={onRefresh}>
        <FontAwesomeIcon icon={faSyncAlt} />
      </button>
    </div>
  );
};

export default AvatarTile;
