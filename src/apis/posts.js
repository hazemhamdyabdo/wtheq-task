import { resource } from "./clint";

export const { get, post, put, delete: del, patch } = resource("/posts");
