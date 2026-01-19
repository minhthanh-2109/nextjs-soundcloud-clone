import { useEffect, useState } from "react"
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    return hasMounted;
}

//wave surferhook
export const useWaveSurfer = (containerRef: React.RefObject<HTMLDivElement>, options: Omit<WaveSurferOptions, 'container'>) => {
    const [wavesurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
    useEffect(() => {
        if (!containerRef.current) return;

        const waveSurfer = WaveSurfer.create(
            {
                ...options,
                container: containerRef.current,
                renderFunction: (channels, ctx) => {
                    const { width, height } = ctx.canvas
                    const data = channels[0]

                    const scale = data.length / width
                    const barWidth = 2
                    const gap = 1
                    const radius = barWidth / 2

                    const TOP_RATIO = 0.7
                    const topHeight = height * TOP_RATIO
                    const bottomHeight = height * (1 - TOP_RATIO)

                    ctx.clearRect(0, 0, width, height)

                    for (let x = 0; x < width; x += barWidth + gap) {
                        const index = Math.floor(x * scale)
                        const value = Math.abs(data[index]) * 1.5

                        const topBar = Math.min(value * topHeight, topHeight)
                        const bottomBar = Math.min(value * bottomHeight, bottomHeight)

                        // ===== PHẦN TRÊN (bo tròn đầu) =====
                        if (topBar > 0) {
                            ctx.beginPath()
                            ctx.moveTo(x, topHeight)
                            ctx.lineTo(x, topHeight - topBar + radius)
                            ctx.arc(
                                x + barWidth / 2,
                                topHeight - topBar + radius,
                                radius,
                                Math.PI,
                                0,
                                false
                            )
                            ctx.lineTo(x + barWidth, topHeight)
                            ctx.closePath()
                            ctx.fill()
                        }

                        // ===== PHẦN DƯỚI (reflection – bo tròn đáy) =====
                        if (bottomBar > 0) {
                            ctx.globalAlpha = 0.35
                            ctx.beginPath()
                            ctx.moveTo(x, topHeight)
                            ctx.lineTo(x, topHeight + bottomBar - radius)
                            ctx.arc(
                                x + barWidth / 2,
                                topHeight + bottomBar - radius,
                                radius,
                                0,
                                Math.PI,
                                false
                            )
                            ctx.lineTo(x + barWidth, topHeight)
                            ctx.closePath()
                            ctx.fill()
                            ctx.globalAlpha = 1
                        }
                    }
                }
            }
        );
        setWaveSurfer(waveSurfer);
        return () => {
            waveSurfer.destroy();
        }
    }, [options, containerRef]);
    return wavesurfer;
}