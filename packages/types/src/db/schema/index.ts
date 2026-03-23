// import type { Numeric } from "@phoenix/db/schema";

export type { Projects, Phases, Units } from "@phoenix/db/schema";

// Utility to convert Numeric columns to number
// type SerializeNumeric<T> = {
//   [K in keyof T]: T[K] extends Numeric | null
//     ? number | null
//     : T[K] extends Numeric
//     ? number
//     : T[K];
// };

