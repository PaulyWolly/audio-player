import React, { useRef, useState, useEffect } from 'react'
import styles from '../styles/AudioPlayer.module.css';

import {FaPlay} from 'react-icons/fa'
import {FaPause} from 'react-icons/fa'
import {MdOutlineForward30} from 'react-icons/md'
import {MdReplay30} from 'react-icons/md'
import {IoVolumeHigh} from 'react-icons/io5'
import {IoVolumeMute} from 'react-icons/io5'

const AudioPlayer = () => {

  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [mute, setMute] = useState(false)
  const [volumePercent, setVolumePercent] = useState(50)


  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference to our progress bar
  const animationRef = useRef();   // reference animation we are working with
  const volumeBar = useRef();     // reference for our volume bar

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.lodedmetadata, audioPlayer?.current?.readyState])

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current)
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`
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
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  }

  const aheadThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
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

  const toggleMuteVolume = () => {

    const prevValue = mute;
    const currentVolumeBeforeMute = volumeBar.current.value;
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

  return (

    <div className={styles.audioPlayer}>
      {/* Comment for the AudioPlayer */}

      {/* Ode to Herb Alpert */}
      <audio
        id="audioPlayer"
        ref={audioPlayer}
        src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3"
        //src="https://drive.google.com/file/d/0B7LtJfBiNp52ZjBjeGFWa3pHTXc/view?usp=sharing&amp;resourcekey=0-qXL8UkZInJp4yR10fFjvpA.mp3"
        preload="metadata"
      ></audio>


      <button className={styles.forwardBackward} onClick={backThirty}><MdReplay30 /></button>

      <button className={styles.playPause} onClick={togglePlayPause}>
        { isPlaying ? <FaPause /> : <FaPlay className={styles.play} /> }
      </button>

      <button className={styles.forwardBackward} onClick={aheadThirty}><MdOutlineForward30 /></button>

      {/* Current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* Progress bar */}
      <div >
        <input
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          type="range"
          onChange={changeRange}
        />
      </div>

      {/* Duration */}
      <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

      {/* Volume */}
      <div className={styles.volume}>
        <button className={styles.muteVolume} onClick={toggleMuteVolume}>
          { mute ? <IoVolumeMute /> : <IoVolumeHigh /> }
        </button>

        <input
          id="volume-slider"
          className={styles.volumeBar}
          ref={volumeBar}
          defaultValue="0.5"
          type="range"
          min="0"
          max="1"
          step="0.1"
          onChange={changeVolume}
        />{!mute && volume * 100 + `%`}

      <p>&nbsp;</p>
      {/* <div>
        <button onClick={getVolume} type="button">What is the volume?</button>
        <button onClick={setZeroVolume} type="button">to 0.0</button>
        <button onClick={setQuarterVolume} type="button">to 0.2</button>
        <button onClick={setHalfVolume} type="button"> to 0.5</button>
        <button onClick={setThreeQuarterVolume} type="button">to 0.7</button>
        <button onClick={setFullVolume} type="button"> to 1.0</button>
        <div id="vol">0</div>
      </div> */}

      </div>

      {/* Space the Final Frontier */}
      <audio src="https://drive.google.com/file/d/0B7LtJfBiNp52N2NQVm5rZG5jdGs/view?usp=sharing&resourcekey=0-Zb_HK1E4F6SFnvI8ytxnKg" preload="metadata" type="audio/mpeg"></audio>

    </div>

  )
}

export { AudioPlayer }
