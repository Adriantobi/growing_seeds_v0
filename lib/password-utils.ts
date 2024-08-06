import { pbkdf2Sync } from "node:crypto";

const saltKey = process.env.SALT_KEY! || "salt-key";
const iterations = 10000;

export function hashPassword(password: string): string {
  return pbkdf2Sync(password, saltKey, iterations, 64, "sha512").toString(
    "hex",
  );
}

export function comparePassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}
