import { createContext, useState, useEffect, useRef, useCallback } from 'react';

export const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [queue, setQueue]               = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [isShuffle, setIsShuffle]       = useState(false);
  const [loopMode, setLoopMode]         = useState(0); // 0=off 1=all 2=one
  const [currentTime, setCurrentTime]   = useState(0);
  const [duration, setDuration]         = useState(0);
  const [volume, setVolume]             = useState(0.8);

  const [likedSongIds, setLikedSongIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('melodify-liked') || '[]'); }
    catch { return []; }
  });

  const currentSong = queue[currentIndex] ?? null;

  // Persist liked songs
  useEffect(() => {
    localStorage.setItem('melodify-liked', JSON.stringify(likedSongIds));
  }, [likedSongIds]);

  // Load new track when song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.src = currentSong.url;
    audioRef.current.load();
    setCurrentTime(0);
    if (isPlaying) audioRef.current.play().catch(() => {});
  }, [currentSong?.id]); // eslint-disable-line

  // Respond to play/pause toggle
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) audioRef.current.play().catch(() => {});
    else           audioRef.current.pause();
  }, [isPlaying]); // eslint-disable-line

  // Sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Static audio event listeners
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrentTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 30);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
    };
  }, []);

  // ── playNext (re-created when deps change, used via ref for onEnded) ──
  const playNext = useCallback(() => {
    if (loopMode === 2) {
      if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play().catch(() => {}); }
      return;
    }
    let next;
    if (isShuffle && queue.length > 1) {
      do { next = Math.floor(Math.random() * queue.length); } while (next === currentIndex);
    } else {
      next = currentIndex + 1;
      if (next >= queue.length) {
        if (loopMode === 1) next = 0;
        else { setIsPlaying(false); return; }
      }
    }
    setCurrentIndex(next);
    setIsPlaying(true);
  }, [queue, currentIndex, isShuffle, loopMode]);

  const playNextRef = useRef(playNext);
  useEffect(() => { playNextRef.current = playNext; }, [playNext]);

  // Attach onEnded once, always calls latest playNext via ref
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnded = () => playNextRef.current();
    a.addEventListener('ended', onEnded);
    return () => a.removeEventListener('ended', onEnded);
  }, []);

  // ── Public API ──

  const playSong = (song, songList) => {
    const idx = songList.findIndex(s => s.id === song.id);
    setQueue(songList);
    setCurrentIndex(idx);
    setIsPlaying(true);
  };

  const togglePlay = () => { if (currentSong) setIsPlaying(p => !p); };

  const playPrev = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    if (currentIndex > 0) { setCurrentIndex(p => p - 1); setIsPlaying(true); }
    else if (loopMode === 1) { setCurrentIndex(queue.length - 1); setIsPlaying(true); }
  };

  const toggleShuffle = () => setIsShuffle(p => !p);
  const cycleLoop     = () => setLoopMode(p => (p + 1) % 3);
  const seekTo        = t  => { if (audioRef.current) { audioRef.current.currentTime = t; setCurrentTime(t); } };
  const changeVolume  = v  => setVolume(v);
  const toggleLike    = id => setLikedSongIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <PlayerContext.Provider value={{
      queue, currentSong, currentIndex,
      isPlaying, isShuffle, loopMode,
      currentTime, duration, volume,
      likedSongIds,
      playSong, togglePlay, playNext, playPrev,
      toggleShuffle, cycleLoop, seekTo, changeVolume, toggleLike,
    }}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
}
