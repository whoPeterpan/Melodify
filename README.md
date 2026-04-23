# Melodify

A modern music streaming web app inspired by Spotify.

---

## Description

Melodify is a React-based music streaming web application designed to deliver a clean, fast, and intuitive listening experience. It enables users to browse songs by genre and mood, manage a personal library of liked songs, and control playback seamlessly through a fully functional music player. The application emphasizes smooth UI transitions, a responsive dark-themed interface, and an overall user experience modeled after modern music platforms.

---

## Features

- Music playback with Play, Pause, Next, and Previous controls
- Shuffle and Loop functionality with three loop modes (Off, Loop All, Loop One)
- Category-based browsing by mood and genre (Pop, Hip Hop, Chill, Jazz, and more)
- Collapsible sidebar navigation with smooth expand and collapse animation
- All Songs section displaying the full song library
- Liked Songs persisted across sessions using localStorage
- Artist information panel for the currently playing track
- Fast and responsive interface with minimal load times
- Dark-themed UI inspired by modern music streaming platforms

---

## Tech Stack

| Technology | Purpose              |
|------------|----------------------|
| React.js   | UI and component logic |
| JavaScript | Application logic    |
| CSS        | Styling and layout   |
| iTunes API | Music data and 30-second audio previews |

---

## Folder Structure

```
src/
 ├── components/
 │    ├── Sidebar.jsx
 │    ├── SongList.jsx
 │    ├── SongCard.jsx
 │    ├── Player.jsx
 │    └── ArtistPanel.jsx
 ├── context/
 │    └── PlayerContext.jsx
 ├── hooks/
 │    └── usePlayer.js
 ├── data/
 │    └── songs.json
 ├── App.jsx
 ├── App.css
 └── main.jsx
```

---

## Installation and Setup

```bash
git clone <repo-link>
cd melodify
npm install
npm run dev
```

The application will be available at `http://localhost:5173` by default.

---

## Usage

1. Launch the development server using `npm run dev`.
2. Browse songs by selecting a mood or genre from the filter pills.
3. Click any song to begin playback.
4. Use the bottom player bar to control playback, seek through the track, and adjust volume.
5. Click the heart icon on any song to add it to Liked Songs. Liked songs are saved automatically.
6. Use the sidebar to navigate between sections. Click the toggle button to collapse or expand the sidebar.

---

## Screenshots

### Main UI

> Screenshot of the main song browsing interface.

### Music Player

> Screenshot of the bottom music player bar with controls active.

### Category Navigation

> Screenshot of the mood and genre filter pills and song list.

---

## Contributors

| Name                          | Role        |
|-------------------------------|-------------|
| Prathviraj Singh Bhadouriya   | Developer   |
| Gyanendra Singh               | Developer   |
| Mayank Shekhar Chaturvedi     | Developer   |

Built collaboratively with a focus on clean UI, smooth user experience, and scalable architecture.

---

## Future Improvements

- User authentication and personalized accounts
- Playlist creation and management
- Full Spotify API or custom backend integration
- Intelligent search and recommendation system
- Ability to save, organize, and share songs and playlists

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

If you find this project useful, consider giving it a star on GitHub.
