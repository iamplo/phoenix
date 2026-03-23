// import 'dotenv/config';

export default ({
  dialect: "postgres",
  includePattern: "public.+(projects|phases|units)",
  outFile: "./src/schema/db.d.ts",
  numericParser: "number",
});

// kysely-codegen --include-pattern="public.+(projects|phases|units)" --out-file="./src/schema/db.d.ts" --dialect="postgres" --numeric-parser="number"