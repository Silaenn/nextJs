import { z } from "zod";

const envSchema = z.object({
  MONGO: z.string().min(1, "MONGO environment variable is required"),
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET environment variable is required"),
  NEXT_PUBLIC_BASE_URL: z.string().optional().default("http://localhost:3000"),
});

export function validateEnv() {
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    console.error("❌ Environment validation failed:");
    result.error.errors.forEach((error) => {
      console.error(`  - ${error.path.join(".")}: ${error.message}`);
    });
    throw new Error("Invalid environment configuration");
  }
  
  console.log("✅ Environment validation passed");
  return result.data;
}
