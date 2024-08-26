import { useState } from 'react';
import Player from './components/Player/Player';
import './App.css';
import defaultBackground from './assets/1.jpg'; // Default background

function App() {
  const [backgroundImg, setBackgroundImg] = useState(defaultBackground);

  // Function to update the background image
  const updateBackground = (newBackground) => {
    setBackgroundImg(newBackground);
  };

  return (
    <div className="App">
      <div className="background">
        <img src={backgroundImg} id="bg-img" alt="Background of the music player" />
      </div>
      <Player updateBackground={updateBackground} />
    </div>
  );
}

export default App;
