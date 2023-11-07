export const spotify = {
  clientId: process.env.SPOTIFY_CLIENT_ID!,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
  scopes: process.env.SPOTIFY_AUTH_SCOPES!,
  redirectUri: process.env.SPOTIFY_AUTH_REDIRECT_URI!,
};

export const server = {
  port: process.env.PORT || 3000,
  isProduction: "production" === process.env.NODE_ENV?.toLowerCase(),
};
