import { mongooseConnect } from "@/lib/mongoose";
import { AdminModel } from "@/models/Admin";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        const { user, password } = credentials;

        try {
          await mongooseConnect();

          const admin = await AdminModel.findOne({ user }).populate("role");

          if (!user) {
            throw new Error("Invalid Credentials");
          }

          const passwordMatch = await AdminModel.comparePassword(
            password,
            admin.password
          );

          if (!passwordMatch) {
            throw new Error("Invalid Credentials");
          }

          return { name: admin.fullName, role: admin.role.name };
        } catch (error) {
          console.error("Error: ", error);
        }
        /* Metodo de ingreso sin coneccion a Mongo DB */
        /* try {
          if (password !== "1111") {
            throw new Error("Invalid Credentials");
          }

          return { name: user };
        } catch (error) {
          console.error("Error: ", error);
        } */
      },
    }),
  ],
  callbacks: {
    session: async (session) => {
      if (!session) return;

      await mongooseConnect();

      const userData = await AdminModel.findOne({
        fullName: session.session.user.name,
      }).populate("role");

      return {
        user: {
          id: userData.id,
          name: userData.fullName,
          role: userData.role.name,
          permissions: userData.permissions,
        },
      };
      /* Metodo de ingreso sin coneccion a Mongo DB
      return {
        user: {
          name: session.session.user.name,
          id: "1234"
        },
      };*/
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    singOut: "/auth/signout",
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.role !== "admin") {
    return res.status(401);
  }
}
