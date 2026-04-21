export default function ArtistPanel({ currentSong }) {
  if (!currentSong) return (
    <div className="artist-panel">
      <h3 className="artist-panel-title">Now Playing</h3>
      <div className="artist-panel-empty">
        <span>🎵</span>
        <p>Play a song to see artist info</p>
      </div>
    </div>
  );

  const large = currentSong.image.replace('100x100', '300x300');

  return (
    <div className="artist-panel">
      <h3 className="artist-panel-title">Now Playing</h3>

      <img src={large} alt={currentSong.title} className="artist-card-img-large" style={{ borderRadius: 8, width: '100%', aspectRatio: '1', objectFit: 'cover', marginBottom: 12 }} />

      <div className="artist-card-info" style={{ marginBottom: 16 }}>
        <p className="artist-card-name">{currentSong.title}</p>
        <p style={{ fontSize: 13, color: '#b3b3b3', marginTop: 4 }}>{currentSong.artist}</p>
      </div>

      <div className="artist-about">
        <h4>About the artist</h4>
        <div className="artist-about-row">
          <img src={large} alt={currentSong.artist} className="artist-avatar" />
          <div>
            <p className="artist-name-bold">{currentSong.artist}</p>
            <p className="artist-listeners">Monthly listeners</p>
          </div>
        </div>
        <p className="artist-bio">Playing via iTunes 30-second preview.</p>
      </div>

      <div className="artist-credits">
        <div className="credits-header">
          <span>Credits</span>
          <button className="show-all-btn">Show all</button>
        </div>
        <p className="credit-role">{currentSong.artist}</p>
        <p className="credit-label">Main Artist</p>
      </div>

      <div className="next-queue">
        <div className="credits-header">
          <span>Next in queue</span>
          <button className="show-all-btn">Open queue</button>
        </div>
        <p className="queue-empty">Managed by player</p>
      </div>
    </div>
  );
}
