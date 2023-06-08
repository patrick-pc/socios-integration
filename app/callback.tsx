import { useEffect } from "react";
import { useRouter } from "next/router";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user came from OAuth redirect
    if (router.query.code) {
      const authCode = router.query.code;

      try {
        // Post the code to your server to exchange for access token
        fetch("/api/exchangeCode", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: authCode,
          }),
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [router]);

  return <div>Processing...</div>;
}
