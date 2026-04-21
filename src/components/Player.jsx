import { usePlayer } from '../hooks/usePlayer';

const Btn = ({ onClick, title, active, children, large }) => (
  <button
    className={`ctrl-btn ${active ? 'ctrl-active' : ''} ${large ? 'ctrl-large' : ''}`}
    onClick={onClick}
    title={title}
  >{children}</button>
);

// Loop mode icons
const LoopIcon = ({ mode }) => {
  if (mode === 2) return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
      <text x="12" y="13" textAnchor="middle" fontSize="7" fill="currentColor">1</text>
    </svg>
  );
  return <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>;
};

export default function Player() {
  const {
    currentSong, isPlaying, isShuffle, loopMode,
    currentTime, duration, volume,
    togglePlay, playNext, playPrev,
    toggleShuffle, cycleLoop, seekTo, changeVolume,
  } = usePlayer();

  const fmt = s => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;
  const pct = duration ? (currentTime / duration) * 100 : 0;
  const volIcon = volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊';

  if (!currentSong) return (
    <div className="player">
      <div className="player-empty">
        <svg viewBox="0 0 24 24" fill="#6a6a6a" width="18" height="18"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        <span>Click a song to start playing</span>
      </div>
    </div>
  );

  return (
    <div className="player active-player">
      {/* Left */}
      <div className="now-playing">
        <img src={currentSong.image} alt={currentSong.title} className="player-album-art" />
        <div className="now-playing-text">
          <h4>{currentSong.title}</h4>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      {/* Center */}
      <div className="player-center">
        <div className="player-controls-row">
          <Btn onClick={toggleShuffle} active={isShuffle} title="Shuffle">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>
          </Btn>
          <Btn onClick={playPrev} title="Previous">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
          </Btn>
          <button className="play-pause-btn" onClick={togglePlay}>
            {isPlaying
              ? <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
              : <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><polygon points="5,3 19,12 5,21"/></svg>
            }
          </button>
          <Btn onClick={playNext} title="Next">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/></svg>
          </Btn>
          <Btn onClick={cycleLoop} active={loopMode > 0} title={['Loop off','Loop all','Loop one'][loopMode]}>
            <LoopIcon mode={loopMode} />
          </Btn>
        </div>

        <div className="progress-row">
          <span className="time-label">{fmt(currentTime)}</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
            <input type="range" className="progress-input" min="0" max={duration || 30} step="0.1" value={currentTime} onChange={e => seekTo(+e.target.value)} />
          </div>
          <span className="time-label">{fmt(duration || 30)}</span>
        </div>
      </div>

      {/* Right */}
      <div className="player-right">
        <span className="volume-icon">{volIcon}</span>
        <div className="volume-track">
          <div className="volume-fill" style={{ width: `${volume * 100}%` }} />
          <input type="range" className="volume-input" min="0" max="1" step="0.01" value={volume} onChange={e => changeVolume(+e.target.value)} />
        </div>
      </div>
    </div>
  );
}
