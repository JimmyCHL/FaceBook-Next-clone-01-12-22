import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  secret:
    "0vQyttaN3fzLZCis6bLoieNLm_FlsyYCHEbnh7-C94edSrHc4kcfNf5bHLN0UcCI_g-UM1VzUWjxYbY5I-VGperpOkmFKZuvPrlaTiwiOxsEVGWRjRzEvOJfaesDzzpJQsNaxPBrCh1RoyxdnCaFxnYDLAU6hU8wS88pOA98q0M",

  session: {
    strategy: "jwt",
  },
});
