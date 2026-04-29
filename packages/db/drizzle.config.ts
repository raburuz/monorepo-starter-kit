import { defineConfig } from 'drizzle-kit'

const config = defineConfig({
  //The full path where schemas are located
  schema: ["./modules/db/src/schemas/*.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
    //ssl: isProduction ? 'verify-full' : false
  },
  strict: true, // Enable strict mode for better type safety
  verbose: true, // Enable verbose logging for better insights during development
  breakpoints: true, // Enable breakpoints for better debugging
})


export default config; 