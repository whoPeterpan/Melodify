import React from 'react';

function SongCard({ song, index, onPlay, isActive, isPlaying, isLiked, onLike }) {
  const showPause = isActive && isPlaying;

  return (
    <div
      className={`song-card ${isActive ? 'active' : ''}`}
      onClick={() => onPlay(song)}
    >
      <div className="song-index">
        <span className="song-index-num">{isActive ? '' : index}</span>
        <span className="song-play-icon">{showPause ? '⏸' : '▶'}</span>
      </div>

      <div className="song-info">
        <img src={song.image} alt={song.title} className="song-image" />
        <div className="song-text">
          <h4>{song.title}</h4>
          <p>{song.artist}</p>
        </div>
      </div>

      <div className="song-album-col">{song.album}</div>

      <div className="song-added-col">Recently</div>

      <div className="song-actions">
        <button
          className={`like-btn ${isLiked ? 'liked' : ''}`}
          onClick={(e) => { e.stopPropagation(); onLike(song.id); }}
          title={isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        <span className="song-duration">{song.duration}</span>
      </div>
    </div>
  );
}

export default SongCard;
