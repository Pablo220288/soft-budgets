import { mongooseConnect } from "@/lib/mongoose";
import { RoleModel } from "@/models/Role";

export default async function handle(req, res) {
  await mongooseConnect();
  // await isAdminRequest(req, res)
  const data = await RoleModel.find({});
  res.json(data);
}
