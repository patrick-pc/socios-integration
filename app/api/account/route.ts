import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const apiUrl = `https://api-public.chiliz.com/user/1.0.0/user/me`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${searchParams.get("accessToken")}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const { data } = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error while checking the remix status:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
