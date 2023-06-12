"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    const exchangeCode = async () => {
      try {
        // Check if user came from OAuth redirect
        if (code) {
          // Post the code to your server to exchange for access token
          const response = await fetch("/api/exchange-code", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: code,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("@@@ data", data);
          localStorage.setItem("accessToken", data.access_token);

          router.push("/");
        }
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };

    exchangeCode();
  }, [code]);

  return <div>Processing...</div>;
}
