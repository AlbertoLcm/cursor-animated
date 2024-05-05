import { useRef, useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import heroVideo from './assets/hero.mp4';

function App() {
  const [cursorCoords, setCursorCoords] = useState({ x: 0, y: 0 });
  const [maskSize, setMaskSize] = useState(40);

  const maskRef = useRef(null);

  useEffect(() => {
    const mask = maskRef.current;

    gsap.to(mask, {
      duration: 0.5,
      css: { webkitMaskPosition: `${cursorCoords.x - maskSize/2}px ${cursorCoords.y - maskSize/2}px`},
      ease: 'back.out',
    });

    const handleMouseMove = (e) => {
      setCursorCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorCoords]);

  const handleMouseEnter = () => {
    setMaskSize(300);
    gsap.to(maskRef.current, {
      duration: 0.5,
      css: { webkitMaskSize: '300px 300px' },
      ease: 'back.out',
    });
  }

  const handleMouseLeave = () => {
    setMaskSize(40);
    gsap.to(maskRef.current, {
      css: { webkitMaskSize: '40px 40px' },
      duration: 0.5,
      ease: 'back.out',
    });
  }
  
  return (
    <main>
      <div className="video-background">
      <video src={heroVideo} autoPlay muted loop />
    </div>
      <div className="title mask" ref={maskRef}>
        <h1 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>HIDING<br /> BAD<br /> SHIT<br /> SINCE<br /> 2009</h1>
      </div>

      <div className="title">
        <h1>MAKING<br /> <span>GOOD<br /> SHIT<br /></span> SINCE<br /> 2009</h1>
      </div>
    </main>
  );
}

export default App;
