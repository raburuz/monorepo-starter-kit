/* LIBRARIES */
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin } from "better-auth/plugins"
import { 
  db, 
  createOrUpdateUserToFreePlan, 
  verification,
  account,
  session,
  user
} from "@app/db"
import { config } from "@app/config"

export const auth = betterAuth({
  database: drizzleAdapter( db , {
    provider: "pg",
    schema:{
      /* NEEDED */
      verification,
      account,
      session,
      user
    }
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }
  },
  emailVerification: {
    expiresIn: 604_800, // ONE WEEK
    autoSignInAfterVerification: true,
  },
  databaseHooks: {
      user: {
        create: {
          async after(user) {
            //Update user to free plan by default
            await createOrUpdateUserToFreePlan(user.id);
        }
      }
    },
  },
  trustedOrigins: [ 
    process.env.FRONTEND_URL ?? '',
  ],
  appName: process.env.APP_NAME ?? '',
  advanced:{
    cookiePrefix: config.auth.cookiePrefix
  },
  plugins:[
    admin({ 
      defaultRole: "customer" 
    })
  ],
}) 