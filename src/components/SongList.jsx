import { usePlayer } from '../hooks/usePlayer';

const MOODS = ['Pop Hits','Slow','Hip Hop','Indie','Relaxing','Romantic','Chill','Sad','Soulful','Jazz','Electronic','Classical'];

export default function SongList({ songs, onPlay, isLoading, section, selectedMood, onMoodChange }) {
  const { currentSong, isPlaying, likedSongIds, toggleLike } = usePlayer();

  if (isLoading) return (
    <div className="loading">
      <div className="spinner" />
      <span>Loading songs…</span>
    </div>
  );

  return (
    <div className="song-list">
      <div className="mood-pills">
        {MOODS.map(m => (
          <button
            key={m}
            className={`mood-pill ${selectedMood.toLowerCase() === m.toLowerCase() ? 'mood-pill-active' : ''}`}
            onClick={() => onMoodChange(m)}
          >{m}</button>
        ))}
      </div>

      <div className="songs-header">
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span>Date added</span>
        <span style={{ display:'flex', justifyContent:'flex-end' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
        </span>
      </div>

      <div className="songs-container">
        {songs.map((song, idx) => {
          const isActive = currentSong?.id === song.id;
          const showPause = isActive && isPlaying;
          const isLiked = likedSongIds.includes(song.id);

          return (
            <div
              key={song.id}
              className={`song-card ${isActive ? 'active' : ''}`}
              onClick={() => onPlay(song)}
            >
              <div className="song-index">
                <span className="song-index-num">{isActive ? '' : idx + 1}</span>
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
                  onClick={e => { e.stopPropagation(); toggleLike(song.id); }}
                  title={isLiked ? 'Remove' : 'Save'}
                >{isLiked ? '❤️' : '🤍'}</button>
                <span className="song-duration">{song.duration}</span>
              </div>
            </div>
          );
        })}

        {songs.length === 0 && (
          <div className="empty-state">
            {section === '/liked' ? "No liked songs yet — click 🤍 on any song!" : "No results found."}
          </div>
        )}
      </div>
    </div>
  );
}
