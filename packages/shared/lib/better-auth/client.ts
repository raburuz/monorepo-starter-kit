import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import { config } from '@app/config'

export const authClient =  createAuthClient({
  baseURL: config.url.api, // the base url of your auth server 
  plugins:[
    adminClient()
  ],
})