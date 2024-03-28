import { Schema, model, models } from "mongoose";

const RoleSchema = new Schema(
  {
    name: { type: String, default: "User" },
    description: { type: String },
    permissions: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const RoleModel = models?.Role || model("Role", RoleSchema);
