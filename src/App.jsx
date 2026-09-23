import React, { useState } from 'react'
import Landing from './components/landing'
import Work from './components/Work'
import Navbar from './components/Navbar'
import { LoadingContext } from './components/LoadingContext';
import Dive from './components/Dive';
import About from './components/About';
import Skills from './components/Skills';
import ScrollSmooth from './components/ScrollSmooth';
import Xray from './components/Xray';
import Projects from './components/Projects';
import TerminalContact from './components/TerminalContact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  return (
    <>
      <ScrollSmooth />
      <Navbar />
      <LoadingContext value={setIsLoaded}>
        <Landing />
      </LoadingContext>
      {isLoaded &&
        <>
          <Work />
          <Dive />
          <About />
          <Skills />
          <Xray />
          <Projects />
          <TerminalContact />
        </>
      }

    </>
  )
}

export default App
