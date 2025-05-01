import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const USER = { id: "1", email: 'temur@gmail.com', password: '1234' }

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: 'e.g johndoe@xxx.xx' },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Demo kullanıcı
        if (credentials?.email === USER.email && credentials?.password === USER.password) {
          return USER;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
};
