"use client";

export default function Home() {
  const login = () => {
    const clientId = process.env.NEXT_PUBLIC_SOCIOS_CLIENT_ID;
    const responseType = "code";
    const redirectUri = encodeURIComponent("http://localhost:3002/callback");
    const partnerTag = "fanmarketcap";

    const authUrl = `https://partner.chiliz.com/oauth2/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&partner_tag=${partnerTag}`;

    // Redirect to the authUrl
    window.location.href = authUrl;
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <button onClick={login} type="button" className="login--button">
        <span>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIbSURBVHgBpVRLbhpBEK0qMJEAybAI3lhJs0giK4hM32C4gXMD5wTGJyA5Ac4JjE9gbgA3GPMLSybrYGUixYlkM12pxgwM4yHK50mt/lT1e1X9KQSB53kqk8u5bIyDQM8ZwbHrwKxggwAQA2T2ATBgMAMD0Idi8VpXqwEOh+O2bGzC/8DAWZYJj0V5rYrAfZl9RqLrpL9ErKQrIeIb2eKuDQStbDGfV99vbyVq6NRrtXfwh/C8qcpkF20GCUTIqVDILw0h8yX8BbQ+8iG2h8rlMvwrQjn8NVFubw8OKk+BEJ00Z2Z2ePv2UkHS/INKBZ4dHp56s1kpQXIinSettxpvIUOkVsPAEi3zLO3vK0cpb4e6XbsQm21rsfDuritXeSnPpxspn/M2WrGoXGmzmM2OXdgFMTYTZFdRdLaX1tkllkamUtRL8TP7nT2NMEp1liYWBN++xsg232swGr0fDMbNxAZ3l9pwPO59md9ERK5ds7cGZpHtAHJLHNqRs/ynPsYeXARvOlX2n81v5nb60fot/dcOw8kJIV8Ig28y1NBH8gWSJJOJQwxXtrw8yeX8Vy9f6EiMIiddf90xwB+sEy3C2Wg0aVn1TfqfTslwb1mjROznj7ARjxgfqcp5EWBrlZ+PDFJOuCSlxX1Ygn54X3irdXUr7UdED2kOj4ky7USFBINwpmu187Q9lLao6/WuuaeGff5RFGaBeheJxS+TpX6sx8ZIugAAAABJRU5ErkJggg==" />
          Connect with Socios
        </span>
      </button>
    </div>
  );
}
