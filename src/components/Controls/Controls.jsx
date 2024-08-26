function PlayerControls({ isPlaying, togglePlay, prev, next }) {
  return (
    <div className="player-controls">
      <i
        className="fa-solid fa-backward"
        title="Previous"
        onClick={prev}
        aria-label="Previous"
        tabIndex="0"
        role="button"
      ></i>
      <i
        className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} play-button`}
        title={isPlaying ? 'Pause' : 'Play'}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        tabIndex="0"
        role="button"
      ></i>
      <i
        className="fa-solid fa-forward"
        title="Next"
        onClick={next}
        aria-label="Next"
        tabIndex="0"
        role="button"
      ></i>
    </div>
  );
}

export default PlayerControls;
