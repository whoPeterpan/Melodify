import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SongList from './components/SongList';
import Player from './components/Player';
import ArtistPanel from './components/ArtistPanel';
import { usePlayer } from './hooks/usePlayer';
import './App.css';

const SECTION_TITLES = {
  '/':        'All Songs',
  '/liked':   'Liked Songs',
  '/search':  'Search Results',
  '/library': 'Your Library',
  '/tophits': 'Top Hits',
  '/trending':'Trending',
};

export default function App() {
  const location = useLocation();
  const { likedSongIds, playSong, currentSong } = usePlayer();

  const [allSongs, setAllSongs]       = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading]     = useState(true);
  const [selectedMood, setSelectedMood] = useState('pop hits');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const section = location.pathname;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(selectedMood)}&limit=25&media=music&entity=song`)
      .then(r => r.json())
      .then(data => {
        const songs = data.results
          .filter(t => t.previewUrl)
          .map(t => ({
            id:       t.trackId,
            title:    t.trackName,
            artist:   t.artistName,
            album:    t.collectionName || '—',
            image:    t.artworkUrl100,
            url:      t.previewUrl,
            duration: '0:30',
          }));
        setAllSongs(songs);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [selectedMood]);

  // Compute which songs to show based on route
  let sectionSongs = allSongs;
  if (section === '/liked')    sectionSongs = allSongs.filter(s => likedSongIds.includes(s.id));
  else if (section === '/tophits')  sectionSongs = allSongs.slice(0, 10);
  else if (section === '/trending') sectionSongs = allSongs.slice(10);

  const displayedSongs = sectionSongs.filter(s => {
    const q = searchQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q);
  });

  const handlePlaySong = song => playSong(song, displayedSongs);

  const title = section === '/search'
    ? `Search Results`
    : (SECTION_TITLES[section] || 'Songs');

  return (
    <div className="app-container">
      <div className="main-content">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(p => !p)}
        />

        <div className="content-area">
          <div className="page-header">
            <h1 className="page-title">{title}</h1>
          </div>

          <div className="top-bar">
            <div className="search-wrapper">
              <svg className="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="What do you want to play?"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          <SongList
            songs={displayedSongs}
            onPlay={handlePlaySong}
            isLoading={isLoading}
            section={section}
            selectedMood={selectedMood}
            onMoodChange={setSelectedMood}
          />
        </div>

        <ArtistPanel currentSong={currentSong} />
      </div>

      <Player />
    </div>
  );
}
