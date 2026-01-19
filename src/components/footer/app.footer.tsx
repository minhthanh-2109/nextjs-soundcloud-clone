'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Box, Container } from '@mui/material';
import { useHasMounted } from '@/utils/customHook';

const AppFooter = () => {
    const hasMounted = useHasMounted();
    if (!hasMounted) {
        return (<></>);
    }
    // console.log("backend:", process.env.NEXT_PUBLIC_BACKEND_URL);
    return (
        <Box>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: "#f2f2f2" }}>
                <Container sx={{ display: "flex", gap: 10 }}>
                    <AudioPlayer
                        // autoPlay
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
                        volume={0.5}
                        onPlay={e => console.log("onPlay")}
                        style={{ boxShadow: 'unset', background: "#f2f2f2" }}
                    // other props here 
                    />
                    <div style={
                        {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            justifyContent: "center",
                            minWidth: 150
                        }
                    }>
                        <div style={{ color: "#ccc" }}>Linkn Park</div>
                        <div style={{ color: "black" }}>What I've done</div>
                    </div>
                </Container>
            </AppBar>
        </Box>
    );
}
export default AppFooter;