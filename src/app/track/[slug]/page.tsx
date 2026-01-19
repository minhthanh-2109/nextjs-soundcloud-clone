'use client'
import WaveTrack from '@/components/track/wave.track';
import Container from '@mui/material/Container';
import { useSearchParams } from 'next/navigation'
const DetailTrackPage = (props: any) => {
    const searchParams = useSearchParams()
    const audio = searchParams.get('audio');
    // console.log(props);
    return (
        <div>
            <div>
                <Container>
                    <WaveTrack></WaveTrack>
                </Container>

            </div>
        </div>
    );
}
export default DetailTrackPage;