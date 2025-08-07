let cachedToken = "";
let tokenExpiresAt = 0;

export async function getSirvToken(
  clientId: string,
  clientSecret: string
): Promise<string> {
  const now = Date.now();

  if (cachedToken && now < tokenExpiresAt) {
    return cachedToken;
  }

  const response = await fetch("https://api.sirv.com/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId, clientSecret }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error("Failed to get token: " + error);
  }

  const data = await response.json();
  if (typeof data.token !== "string") {
    throw new Error("Invalid token response");
  }

  cachedToken = data.token;
  tokenExpiresAt = now + data.expiresIn * 1000 - 10_000;

  return cachedToken;
}
