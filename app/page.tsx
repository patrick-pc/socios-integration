"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const [account, setAccount] = useState(null) as any;

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (accessToken) {
        const response = await fetch(
          `/api/account?accessToken=${accessToken}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAccount(data);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const login = () => {
    const clientId = process.env.NEXT_PUBLIC_SOCIOS_CLIENT_ID;
    const responseType = "code";
    const redirectUri = encodeURIComponent("http://localhost:3002/callback");
    const partnerTag = "ethpass";

    const authUrl = `https://partner.chiliz.com/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&partner_tag=${partnerTag}`;

    // Redirect to the authUrl
    window.location.href = authUrl;
  };

  return (
    <>
      <Navbar />

      <div className="flex h-screen w-full flex-col items-start justify-between md:flex-row">
        {account ? (
          <>
            <div className="flex w-full flex-col items-center justify-center gap-4 p-12 text-center md:mt-24">
              <div className="flex items-center justify-center gap-4">
                <img
                  src={account?.avatar}
                  alt="avatar"
                  className="h-16 w-16 flex-shrink-0 rounded-full"
                />

                <div className="flex flex-col items-start justify-center">
                  <div className="text-xl font-medium">{account?.username}</div>
                  <div className="text-sm text-zinc-500">{account?.email}</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full flex-col items-center justify-center gap-8 p-12 text-center md:mt-24">
              <h1 className="text-2xl font-medium tracking-wider md:text-4xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </h1>

              <button
                onClick={login}
                type="button"
                className="login--button select-none"
              >
                <span>
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIbSURBVHgBpVRLbhpBEK0qMJEAybAI3lhJs0giK4hM32C4gXMD5wTGJyA5Ac4JjE9gbgA3GPMLSybrYGUixYlkM12pxgwM4yHK50mt/lT1e1X9KQSB53kqk8u5bIyDQM8ZwbHrwKxggwAQA2T2ATBgMAMD0Idi8VpXqwEOh+O2bGzC/8DAWZYJj0V5rYrAfZl9RqLrpL9ErKQrIeIb2eKuDQStbDGfV99vbyVq6NRrtXfwh/C8qcpkF20GCUTIqVDILw0h8yX8BbQ+8iG2h8rlMvwrQjn8NVFubw8OKk+BEJ00Z2Z2ePv2UkHS/INKBZ4dHp56s1kpQXIinSettxpvIUOkVsPAEi3zLO3vK0cpb4e6XbsQm21rsfDuritXeSnPpxspn/M2WrGoXGmzmM2OXdgFMTYTZFdRdLaX1tkllkamUtRL8TP7nT2NMEp1liYWBN++xsg232swGr0fDMbNxAZ3l9pwPO59md9ERK5ds7cGZpHtAHJLHNqRs/ynPsYeXARvOlX2n81v5nb60fot/dcOw8kJIV8Ig28y1NBH8gWSJJOJQwxXtrw8yeX8Vy9f6EiMIiddf90xwB+sEy3C2Wg0aVn1TfqfTslwb1mjROznj7ARjxgfqcp5EWBrlZ+PDFJOuCSlxX1Ygn54X3irdXUr7UdED2kOj4ky7USFBINwpmu187Q9lLao6/WuuaeGff5RFGaBeheJxS+TpX6sx8ZIugAAAABJRU5ErkJggg==" />
                  Connect with Socios
                </span>
              </button>
            </div>
          </>
        )}

        <div className="flex w-full items-center justify-center">
          <div className="relative select-none">
            <div className="absolute inset-0 rounded-xl bg-purple-500/40"></div>
            <img src="/hero.jpg" alt="hero" className="h-[600px] rounded-xl" />
          </div>
        </div>
      </div>
    </>
  );
}
