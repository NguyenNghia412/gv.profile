import NextAuth from "next-auth";

const WELL_KNOWN_URL = `${process.env.NEXTAUTH_BASE_URL}/.well-known/openid-configuration`;
const TOKEN_ENDPOINT = `${process.env.NEXTAUTH_BASE_URL}/connect/token`;
const CONNECT_AUTHORIZE_URL = `${process.env.NEXTAUTH_BASE_URL}/connect/authorize`;
const CONNECT_TOKEN_URL = `${process.env.NEXTAUTH_BASE_URL}/connect/token`;

console.log("WELL_KNOWN_URL:", WELL_KNOWN_URL);
console.log("TOKEN_ENDPOINT:", TOKEN_ENDPOINT);
console.log("CONNECT_AUTHORIZE_URL:", CONNECT_AUTHORIZE_URL);
console.log("CONNECT_TOKEN_URL:", CONNECT_TOKEN_URL);

const handler = NextAuth({
  providers: [
    {
      id: "openiddict",
      name: "OpenIddict",
      type: "oauth",

      //   wellKnown: WELL_KNOWN_URL,

      clientId: process.env.AUTH_CLIENT_ID,

      clientSecret: process.env.AUTH_CLIENT_SECRET,

      authorization: {
        params: {
          scope: "openid offline_access",
        },
        url: CONNECT_AUTHORIZE_URL,
      },

      // ✅ Chỉ thêm block này, không đụng gì khác
      token: {
        url: CONNECT_TOKEN_URL,
        async request(context) {
          const { provider, params, checks } = context;

          const body = new URLSearchParams({
            grant_type: "authorization_code",
            code: params.code as string,
            redirect_uri: provider.callbackUrl,
            client_id: provider.clientId as string,
            client_secret: provider.clientSecret as string,
            ...(checks.code_verifier
              ? { code_verifier: checks.code_verifier }
              : {}),
          });

          const response = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
          });

          const tokens = await response.json();
          return { tokens };
        },
      },

      userinfo: {
        url: `${process.env.NEXTAUTH_BASE_URL}/connect/userinfo`,
        async request(context) {
          console.log(
            "Fetching user info with access token:",
            context.tokens.access_token,
          );
          const response = await fetch(
            `${process.env.NEXTAUTH_BASE_URL}/connect/userinfo`,
            {
              headers: {
                Authorization: `Bearer ${context.tokens.access_token}`,
              },
            },
          );
          return await response.json();
        },
      },

      idToken: false,
      checks: ["pkce", "state"],

      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],

  session: {
    strategy: "jwt", // store session in cookie (default good choice)
  },

  callbacks: {
    async jwt({ token, account }) {
      // Runs when login happens
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.id_token = account.id_token;
      }
      return token;
    },

    async session({ session, token }) {
      //   session.access_token = token.access_token;
      //   session.user.id = token.sub;
      console.log({ token });
      return {
        ...session,
        access_token: token.access_token,
        user: { ...session.user, id: token.sub },
      };
    },
  },

  debug: true,
});

export { handler as GET, handler as POST };
