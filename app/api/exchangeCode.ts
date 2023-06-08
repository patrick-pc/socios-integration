import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.body;

  const clientId = process.env.SOCIOS_CLIENT_ID as string;
  const clientSecret = process.env.SOCIOS_CLIENT_SECRET as string;

  const grantType = "authorization_code";
  const redirectUri = "http://localhost:3002/callback";
  const scope = "user:read";

  console.log("@@@ code", code);
  console.log("@@@ clientId", clientId);
  console.log("@@@ clientSecret", clientSecret);

  try {
    const response = await fetch("https://partner.chiliz.com/oauth/token", {
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
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    });

    console.log("@@@ response", response);
    console.log("@@@ response.status", response.status);
    console.log("@@@ response.statusText", response.statusText);

    if (response.status === 200) {
      const data = await response.json();

      console.log("@@@ data", data);
      res.status(200).json({ accessToken: data });
    } else {
      res
        .status(400)
        .json({ error: "Failed to exchange code for access token" });
    }
  } catch (error) {
    res.status(500).json({ error: "error.message" });
  }
}
