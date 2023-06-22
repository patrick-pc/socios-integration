import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  const clientSecret = process.env.SOCIOS_CLIENT_SECRET as string;
  const clientId = process.env.NEXT_PUBLIC_SOCIOS_CLIENT_ID as string;
  const redirectUri = process.env.NEXT_PUBLIC_CALLBACK_URL as string;
  const grantType = "authorization_code";

  let data = null;
  try {
    const response = await fetch("https://partner.chiliz.com/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          clientId + ":" + clientSecret
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: grantType,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      console.error("Error response from server:", await response.text());
      throw new Error("Server error");
    }

    data = await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Error while making request to external API:",
        error.message
      );
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json(data);
}
