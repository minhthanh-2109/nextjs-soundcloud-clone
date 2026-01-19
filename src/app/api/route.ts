import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
    const url = new URL(request.url);
    console.log(url);
    const searchParams = new URLSearchParams(url.search);
    console.log(searchParams);
    const audioFile = searchParams.get("audio"); // Retrieves the value of the 'skip' parameter

    console.log(audioFile);

    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${audioFile}`);
}