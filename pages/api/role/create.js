import { mongooseConnect } from "@/lib/mongoose";
import { RoleModel } from "@/models/Role";

export default async function handle(req, res) {
  try {
    await mongooseConnect();
    // await isAdminRequest(req, res)

    const count = await RoleModel.estimatedDocumentCount();
    if (count > 0) return res.json({ role: "Administrators already exist" });

    const roles = await Promise.all([
      RoleModel.create({
        name: "superadmin",
        description: "Super Adminstrador",
        permissions: "all",
      }),
      RoleModel.create({ name: "admin", description: "Adminstrador" }),
      RoleModel.create({
        name: "moderator",
        description: "Moderador",
      }),
      RoleModel.create({ name: "user", description: "Usuario" }),
    ]);

    res.json(roles);
  } catch (error) {
    console.error(error);
  }
}
