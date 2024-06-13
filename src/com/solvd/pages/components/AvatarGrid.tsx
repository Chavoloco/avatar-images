import React, { useState, useEffect } from 'react';
import AvatarTile from './AvatarTile';
import './AvatarGrid.css';
import axios from 'axios';

const AvatarGrid: React.FC = () => {
  const [tiles, setTiles] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean[]>([]);

  useEffect(() => {
    const savedAvatars = localStorage.getItem('avatars');
    if (savedAvatars) {
      setTiles(JSON.parse(savedAvatars));
      setLoading(new Array(JSON.parse(savedAvatars).length).fill(false));
    } else {
      const fetchInitialAvatars = async () => {
        const newTiles = await Promise.all(
          new Array(6).fill('').map(async () => {
            const response = await axios.get('https://randomuser.me/api/');
            return response.data.results[0].picture.large;
          })
        );
        setTiles(newTiles);
        setLoading(new Array(6).fill(false));
      };
      fetchInitialAvatars();
    }
  }, []);

  useEffect(() => {
    if (tiles.length > 0) {
      localStorage.setItem('avatars', JSON.stringify(tiles));
    }
  }, [tiles]);

  const addTile = async () => {
    setLoading([...loading, true]);

    const response = await axios.get('https://randomuser.me/api/');
    const newAvatarUrl = response.data.results[0].picture.large;

    setTiles([...tiles, newAvatarUrl]);
    setLoading([...loading, false]);
  };

  const refreshTile = async (index: number) => {
    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });

    const response = await axios.get('https://randomuser.me/api/');
    const newUrl = response.data.results[0].picture.large;

    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];
      newTiles[index] = newUrl;
      return newTiles;
    });

    setLoading((prevLoading) => {
      const newLoading = [...prevLoading];
      newLoading[index] = false;
      return newLoading;
    });
  };

  const refreshAllTiles = async () => {
    setLoading(new Array(tiles.length).fill(true));

    const newTiles = await Promise.all(
      tiles.map(async () => {
        const response = await axios.get('https://randomuser.me/api/');
        return response.data.results[0].picture.large;
      })
    );

    setTiles(newTiles);
    setLoading(new Array(tiles.length).fill(false));
  };

  return (
    <div className="avatar-grid">
      <div className="tiles-container">
        {tiles.map((tile, index) => (
          <AvatarTile
            key={index}
            initialAvatarUrl={tile}
            loading={loading[index]}
            onRefresh={() => refreshTile(index)}
          />
        ))}
        <div className="avatar-tile add-tile" onClick={addTile}>
          <div className="plus">+</div>
        </div>
      </div>
      <button className="refresh-all-btn" onClick={refreshAllTiles}>Refresh All</button>
    </div>
  );
};

export default AvatarGrid;
