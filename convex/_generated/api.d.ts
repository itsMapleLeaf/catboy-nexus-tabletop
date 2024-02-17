/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.9.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as diceRolls from "../diceRolls.js";
import type * as diceSets from "../diceSets.js";
import type * as env from "../env.js";
import type * as genesysDice from "../genesysDice.js";
import type * as helpers from "../helpers.js";
import type * as http from "../http.js";
import type * as images from "../images.js";
import type * as profiles from "../profiles.js";
import type * as rooms from "../rooms.js";
import type * as testing from "../testing.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  diceRolls: typeof diceRolls;
  diceSets: typeof diceSets;
  env: typeof env;
  genesysDice: typeof genesysDice;
  helpers: typeof helpers;
  http: typeof http;
  images: typeof images;
  profiles: typeof profiles;
  rooms: typeof rooms;
  testing: typeof testing;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
