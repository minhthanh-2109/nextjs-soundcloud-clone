
import MainSlider from "@/components/main/main.slider";
import { sendRequestTS } from "@/utils/api";
import { Container } from "@mui/material";



const HomePage = async () => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify({
  //     category: "CHILL",
  //     limit: 10
  //   })
  // })
  // console.log(">>check res server: ", await res.json());
  const chill = await sendRequestTS<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: { category: "CHILL", limit: 10 }
  });
  // console.log(">>check res server ts: ", res.data);
  const workout = await sendRequestTS<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: { category: "WORKOUT", limit: 10 }
  });
  const party = await sendRequestTS<IBackendRes<ITrackTop[]>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
    method: 'POST',
    body: { category: "PARTY", limit: 10 }
  });
  return (
    <Container>
      <MainSlider
        title="Top Chill Songs"
        data={chill?.data ?? []} />
      <MainSlider
        title="Top Workout Songs"
        data={workout?.data ?? []} />
      <MainSlider
        title="Top Party Songs"
        data={party?.data ?? []} />
    </Container>

  );
}
export default HomePage;
