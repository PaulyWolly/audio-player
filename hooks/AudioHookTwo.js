import React, { useState, useRef, useEffect } from 'react'

const useAudioTwo = () => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeJump, setTimeJump] = useState(0);

  const [volume, setVolume] = useState(0.5)
  const [mute, setMute] = useState(false)
  const [volumePercent, setVolumePercent] = useState(50)

  // references
  const audioPlayerTwo = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation
  const volumeBar = useRef();     // reference for the Volume Bar

  // handle time jumps
  useEffect(() => {
    timeTravel(timeJump);
    setIsPlaying(true);
    play();
  }, [timeJump])

  // grabs the loaded metadata
  useEffect(() => {
    const seconds = Math.floor(audioPlayerTwo.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayerTwo?.current?.loadedmetadata, audioPlayerTwo?.current?.readyState])


  // when you get to the end
  useEffect(() => {
    if (Number(duration) > 1 && Number(currentTime) === Number(duration)) {
      togglePlayPause();
      timeTravel(0);
    }
  }, [currentTime, duration]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const play = () => {
    audioPlayerTwo.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayerTwo.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      play();
    }
  }

  const toggleMuteVolume = () => {

    const prevValue = mute;
    //const currentVolumeBeforeMute = volumeBar.current.value;
    setMute(!prevValue);
    setVolumePercent(volumeBar.current.value)

    if (!prevValue) {
      const x = document.getElementById("audioPlayer");
      x.volume = 0.0;
      volumeBar.current.value = x.volume;
    } else {
      const x = document.getElementById("audioPlayer");
      x.volume = 0.5;
      volumeBar.current.value = x.volume;
      setVolumePercent(prevValue)
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayerTwo?.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayerTwo.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changeVolume = () => {
    audioPlayerTwo.current.volume = volumeBar.current.value;
    volumeBar.current.style.setProperty('--seek-before-width', `${volumeBar.current.value / volume * 100}%`)
    setVolume(volumeBar.current.value)
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    timeTravel(Number(progressBar.current.value) - 30);
  }

  const forwardThirty = () => {
    timeTravel(Number(progressBar.current.value) + 30);
  }

  const timeTravel = (newTime) => {
    progressBar.current.value = newTime;
    changeRange();
  }

  return {
    isPlaying,
    duration,
    currentTime,
    audioPlayerTwo,
    progressBar,
    calculateTime,
    togglePlayPause,
    changeRange,
    backThirty,
    forwardThirty,
    timeTravel,
    setDuration,
    setIsPlaying,
    setTimeJump,
    toggleMuteVolume,
    play
  }
}

export { useAudioTwo }