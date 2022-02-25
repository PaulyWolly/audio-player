/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react'
import styles from '../styles/AudioPlayer.module.css';
import PropTypes from "prop-types";

import {FaPlay} from 'react-icons/fa'
import {FaPause} from 'react-icons/fa'
import {MdOutlineForward30} from 'react-icons/md'
import {MdReplay30} from 'react-icons/md'
import {IoVolumeHigh} from 'react-icons/io5'
import {IoVolumeMute} from 'react-icons/io5'

import { useAudioTwo } from '../hooks/AudioHookTwo';

const AudioPlayerTwo = ({ timeJump, track }) => {



  const {
    isPlaying,
    duration,
    volume,
    play,
    mute,
    currentTime,
    audioPlayerTwo,
    volumeBar,
    progressBar,
    calculateTime,
    togglePlayPause,
    changeRange,
    backThirty,
    forwardThirty,
    changeVolume,
    timeTravel,
    toggleMuteVolume,
    setIsPlaying,
    setDuration,
    setTimeJump
  } = useAudioTwo();

  const chapters = [
    {
      start: 0,
      end: 15
    },
    {
      start: 50,
      end: 70
    }
  ]


  return (

    <div className={styles.audioPlayer}>
      {/* Comment for the AudioPlayer */}

      {/* Ode to Herb Alpert */}
      <audio
        id="audioPlayer"
        ref={audioPlayerTwo}
        src="https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3"
        //src="https://drive.google.com/file/d/0B7LtJfBiNp52ZjBjeGFWa3pHTXc/view?usp=sharing&amp;resourcekey=0-qXL8UkZInJp4yR10fFjvpA.mp3"
        preload="metadata"
      ></audio>


      <button className={styles.forwardBackward} onClick={backThirty}><MdReplay30 /></button>

      <button className={styles.playPause} onClick={togglePlayPause}>
        { !isPlaying ? <FaPause /> : <FaPlay className={styles.play} /> }
      </button>

      <button className={styles.forwardBackward} onClick={forwardThirty}><MdOutlineForward30 /></button>

      {/* Current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* Progress bar */}
      <div className={styles.progressBarWrapper}>
        <input
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          type="range"
          onChange={changeRange}
        />
        {/* {chapters.map((chapter, i) => {
          const leftStyle = chapter.start / duration * 100;
          const widthStyle = (chapter.end - chapter.start) / duration * 100;
          //console.table({i, leftStyle, widthStyle})

          return (
            <div
              key={i}
              className={`${styles.chapter} ${chapter.start == 0 && styles.start} ${chapter.end == duration && styles.end}`}
              style={{
                '--left': `${leftStyle}%`,
                '--width': `${widthStyle}%`
              }}
            ></div>
          )
        })} */}

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
        />
        {/* {!mute && volume * 100 + `%`} */}

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

    </div>

  )
}

AudioPlayerTwo.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number
  })),
  timeJump: PropTypes.number,
  track: PropTypes.string.isRequired
};

AudioPlayerTwo.defaultProps = {
  chapters: [],
  timeJump: 0,
};

export { AudioPlayerTwo }
