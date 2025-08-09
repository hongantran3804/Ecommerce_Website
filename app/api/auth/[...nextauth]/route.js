import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/User";
import bcrypt from "bcrypt";
const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // This authorize function will be called when we call sign In function
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;
        const user = await User.findOne({ email: email });
        if (!user) return null;
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch && user) {
          if (user.confirmed) {
            return user;
          } else {
            await User.findByIdAndDelete({ _id: user._id });
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 20 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        return {
          ...token,
          id: user._id,
          isAdmin: user.isAdmin,
        };
      }
      return token;
    },
    async session({ session, token }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      token.isAdmin = sessionUser.isAdmin;
      return {
        ...session,
        user: {
          name: token.name,
          id: token.id ? token.id.toString() : sessionUser._id.toString(),
          isAdmin: token.isAdmin ? token.isAdmin : session.user.isAdmin,
          ...session.user,
        },
      };
    },
    async signIn({ account, profile, user, credentials }) {
      if (account.provider === "google") {
        try {
          const userExist = await User.findOne({ email: profile.email });
          if (!userExist) {
            const newUser = await User.create({
              email: profile.email,
              name: profile.name,
              image: profile.image,
              confirmed: true,
            });
            const res = await newUser.save();
            if (res.ok) {
              return newUser;
            }
          }
          return userExist;
        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
