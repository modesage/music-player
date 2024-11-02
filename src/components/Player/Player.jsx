import { useState, useRef, useEffect } from 'react';
import PlayerControls from '../Controls/Controls';
import './Player.css';

import song1 from '../../assets/1.mp3';
import song2 from '../../assets/2.mp3';
import song3 from '../../assets/3.mp3';
import cover1 from '../../assets/1.jpg';
import cover2 from '../../assets/2.jpg';
import cover3 from '../../assets/3.jpg';

const songs = [
  { path: song1, displayName: 'kiwa LIVE session', cover: cover1, background: cover1, artist: 'Yiruma' },
  { path: song2, displayName: 'Metro (Extended Mix)', cover: cover2, background: cover2, artist: 'Kevin de Vries & Mau P' },
  { path: song3, displayName: 'Always Here (Trance Mix)', cover: cover3, background: cover3, artist: 'Namie Amuro' },
];

function Player({ updateBackground }) {
  const [musicIndex, setMusicIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const song = songs[musicIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = song.path;
      audioRef.current.load();
      updateBackground(song.background); // Update background when song changes
      setCurrentTime(0); // Reset currentTime to 0
      setIsPlaying(false); // Reset play/pause button to play
    }
  }, [musicIndex, song.path, song.background, updateBackground]);

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', updateProgress);
      return () => {
        audioElement.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeMusic = (direction) => {
    const newIndex = (musicIndex + direction + songs.length) % songs.length;
    setMusicIndex(newIndex);
    setIsPlaying(false); 
  };

  const handleSliderChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="container">
      <div className="player-img">
        <img src={song.cover} className="active" alt={song.displayName} />
      </div>
      <h2 id="music-title">{song.displayName}</h2>
      <h3 id="music-artist">{song.artist}</h3>
      <div className="player-progress">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSliderChange}
          className="slider"
        />
        <div className="music-duration">
          <span id="current-time">{formatTime(currentTime)}</span>
          <span id="duration">{formatTime(duration)}</span>
        </div>
      </div>
      <PlayerControls
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        prev={() => changeMusic(-1)}
        next={() => changeMusic(1)}
      />
      <audio ref={audioRef} onEnded={() => changeMusic(1)} />
    </div>
  );
}

const formatTime = (time) => {
  if (isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default Player;
