let config = {};
config.database = Deno.env.toObject().DATABASE_URL;

// if (Deno.env.get("DATABASE_URL")) {
//   config.database = Deno.env.toObject().DATABASE_URL;
// } else {
//   config.database = {
//     hostname: "",
//     database: "",
//     user: "",
//     password: "",
//     port: "",
//   };
// }

export { config };
