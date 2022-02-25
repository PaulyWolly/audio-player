import { useState, useRef, useEffect } from "react"

const useAudio = () => {

  // state
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [timeJump, setTimeJump] = useState(0)

  const [volume, setVolume] = useState(0.5)
  const [mute, setMute] = useState(false)
  const [volumePercent, setVolumePercent] = useState(50)

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference to our progress bar
  const animationRef = useRef();   // reference animation we are working with
  const volumeBar = useRef();     // reference for our volume bar

  // handle time jumps
  useEffect(() => {
    timeTravel(timeJump);
    setIsPlaying(true);
    play();
  }, [timeJump])

  //grabbing our metadata
  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.lodedmetadata, audioPlayer?.current?.readyState])

  // end of file handling
  useEffect(() => {
    if (Number(duration) > 0 && Number(currentTime) === Number(duration))  {
      togglePlayPause()
      timeTravel(0);
    }
  }, [currentTime, duration])

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      play()
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

  const play = () => {
    audioPlayer.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer?.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changeVolume = () => {
    audioPlayer.current.volume = volumeBar.current.value;
    volumeBar.current.style.setProperty('--seek-before-width', `${volumeBar.current.value / volume * 100}%`)
    setVolume(volumeBar.current.value)
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value)
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

    // const x = document.getElementById("audioPlayer");

    const getVolume = () => {
      const x = document.getElementById("audioPlayer");
      document.getElementById("vol").innerHTML = x.volume;
      audioPlayer.current.volume
    }
    const setZeroVolume = () => {
      const x = document.getElementById("audioPlayer");
      x.volume = 0.0;
      volumeBar.current.value = x.volume;
    }
    const setQuarterVolume = () => {
      const x = document.getElementById("audioPlayer");
      x.volume = 0.2;
      volumeBar.current.value = x.volume;
    }
    const setHalfVolume = () => {
      const x = document.getElementById("audioPlayer");
      x.volume = 0.5;
      volumeBar.current.value = x.volume;
    }
    const setThreeQuarterVolume = () => {
      const x = document.getElementById("audioPlayer");
      x.volume = 0.7;
      volumeBar.current.value = x.volume;
    }
    const setFullVolume = () => {
      const x = document.getElementById("audioPlayer");
      x.volume = 1.0;
      volumeBar.current.value = x.volume;
    }



  return {
    isPlaying,
    duration,
    volume,
    mute,
    currentTime,
    audioPlayer,
    volumeBar,
    progressBar,
    calculateTime,
    togglePlayPause,
    changeRange,
    backThirty,
    forwardThirty,
    changeVolume,
    timeTravel,
    setDuration,
    setIsPlaying,
    setTimeJump,
    toggleMuteVolume,
    play
  }
}

export { useAudio }