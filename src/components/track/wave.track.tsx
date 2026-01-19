'use client'
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useWaveSurfer } from '@/utils/customHook';
import './wave.scss';
import './soundcloud-player.scss';
import { Tooltip } from '@mui/material';


const WaveTrack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<HTMLDivElement>(null);
    const durationRef = useRef<HTMLDivElement>(null);
    // const [time, setTime] = useState<string>("0:00");
    // const [duration, setDuration] = useState<string>("0:00");
    const searchParams = useSearchParams();
    const audioFile = searchParams.get('audio');
    const [isPlaying, setIsPlaying] = useState<boolean>(false);


    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        let gradient, progressGradient;
        if (typeof window !== 'undefined') {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Define the waveform gradient
            gradient = ctx!.createLinearGradient(0, 0, 0, canvas.height * 1)
            // gradient.addColorStop(0, '#656666') // Top color
            // gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            // gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            // gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            // gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            // gradient.addColorStop(1, '#B1B1B1') // Bottom color

            gradient.addColorStop(0, '#656666');
            gradient.addColorStop(0.7, '#656666');
            gradient.addColorStop(0.71, '#ffffff');
            gradient.addColorStop(0.72, '#ffffff');
            gradient.addColorStop(0.73, '#B1B1B1');
            gradient.addColorStop(1, '#B1B1B1');

            // Define the progress gradient
            progressGradient = ctx!.createLinearGradient(0, 0, 0, canvas.height * 1)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }
        return {
            waveColor: gradient,
            progressColor: progressGradient,
            height: 130,
            barWidth: 3,
            barGap: 1,
            url: `/api?audio=${audioFile}`,
        }
    }, []);


    const wavesurfer = useWaveSurfer(containerRef, optionsMemo);
    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer?.isPlaying() ? wavesurfer?.pause() : wavesurfer?.play();
        }
    }, [wavesurfer])
    // useEffect(() => {
    //     if (!wavesurfer) return;
    //     setIsPlaying(false);
    //     const hover = hoverRef.current!;
    //     const waveform = containerRef.current!;
    //     const timeEl = timeRef.current!;
    //     const durationEl = durationRef.current!;
    //     const subscriptions = [
    //         wavesurfer.on('play', () => setIsPlaying(true)),
    //         wavesurfer.on('pause', () => setIsPlaying(false)),
    //         waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`)),
    //         wavesurfer.on('decode', (duration) =>
    //         //     {
    //         //     setDuration(formatTime(duration));
    //         { durationEl.textContent = formatTime(duration) }
    //             // }
    //         ),
    //         wavesurfer.on('timeupdate', (currentTime) =>
    //         //     {
    //         //     setTime(formatTime(currentTime));
    //         // }
    //         { timeEl.textContent = formatTime(currentTime) }
    //         ),
    //         wavesurfer.once('interaction', () => {
    //             wavesurfer.play();
    //         }),
    //     ]
    //     return () => {
    //         subscriptions.forEach((unsub) => unsub())
    //     }
    // }, [wavesurfer]);

    // 
    // }
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }
    useEffect(() => {
        if (!wavesurfer) return;

        const hover = hoverRef.current!;
        const waveform = containerRef.current!;
        const timeEl = timeRef.current!;
        const durationEl = durationRef.current!;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onDecode = (duration: number) => {
            durationEl.textContent = formatTime(duration);
        };
        const onTimeUpdate = (currentTime: number) => {
            timeEl.textContent = formatTime(currentTime);
        };
        const onPointerMove = (e: PointerEvent) => {
            hover.style.width = `${(e as any).offsetX}px`;
        };

        wavesurfer.on('play', onPlay);
        wavesurfer.on('pause', onPause);
        wavesurfer.on('decode', onDecode);
        wavesurfer.on('timeupdate', onTimeUpdate);
        waveform.addEventListener('pointermove', onPointerMove);

        wavesurfer.once('interaction', () => {
            wavesurfer.play();
        });

        return () => {
            wavesurfer.un('play', onPlay);
            wavesurfer.un('pause', onPause);
            wavesurfer.un('decode', onDecode);
            wavesurfer.un('timeupdate', onTimeUpdate);
            waveform.removeEventListener('pointermove', onPointerMove);
        };
    }, [wavesurfer]);


    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 30,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 50,
            user: "username 3",
            content: "just a comment3"
        },
    ];

    const calLeft = (moment: number) => {
        const hardCodeDuration = 199;
        const percent = (moment / hardCodeDuration) * 100;
        return `${percent}%`
    }
    const playAtTime = (timeInSeconds: number) => {
        if (!wavesurfer) return;

        const duration = wavesurfer.getDuration();
        if (!duration) return;

        const progress = timeInSeconds / duration;
        wavesurfer.seekTo(progress);
        wavesurfer.play();
    };

    return (
        <div className="sc-player" style={{ marginTop: '20px' }}>
            {/* LEFT */}
            <div className="sc-left">
                <button className="sc-play-btn" onClick={onPlayClick}>
                    {isPlaying ? "❚❚" : "▶"}
                </button>
            </div>

            {/* CENTER */}
            <div className="sc-center">
                <div className="sc-track-info">
                    <div className="sc-title">Linkin Park – What I’ve Done</div>
                    <div className="sc-user">user7668228</div>
                </div>

                <div className="sc-waveform">
                    <div className="wave-surfer-container" ref={containerRef}>
                        <div className="time" ref={timeRef}></div>
                        <div className="duration" ref={durationRef}>--:--</div>
                        <div className="hover" ref={hoverRef}>--:--</div>
                        <div className='comments' style={{ position: 'relative' }}>
                            {arrComments.map((item) => {
                                return (
                                    <Tooltip key={item.id} title={
                                        <div className="sc-tooltip">
                                            <div className="sc-tooltip-user">{item.user}</div>
                                            <div className="sc-tooltip-content">{item.content}</div>
                                            <div className="sc-tooltip-time">{formatTime(item.moment)}</div>
                                        </div>
                                    } arrow>
                                        <img
                                            onPointerMove={(e) => {
                                                const hover = hoverRef.current!;
                                                hover.style.width = calLeft(item.moment + 3)
                                            }}
                                            onClick={() => playAtTime(item.moment)}
                                            className="sc-comment-avatar"
                                            src={item.avatar}
                                            style={{
                                                position: 'absolute',
                                                top: '92px',
                                                left: calLeft(item.moment),
                                                zIndex: 20,
                                            }}
                                        />
                                    </Tooltip>

                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="sc-right">
                <span className="sc-time">15 years ago</span>
                <div className="sc-cover"></div>
            </div>
        </div>
    )

}
export default WaveTrack;