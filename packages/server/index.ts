import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from "hono/cors";
import { auth } from '@app/shared/lib/better-auth/server';

export const HonoServerInstance = (
  { 
    port,
    routes = [],
    basePath = '/api',
  }: { 
    port: number,
    routes?: Hono[],
    basePath?: string, 
  }
) => {
    
  const app = new Hono();

  // Add the basepath
  app.basePath(basePath);
  
  app.use(
    '*',
    cors({
      origin: "http://localhost:3001", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true, 
    })
  );

  app.on(["POST", "GET"], '/auth/*', c => {
    return auth.handler(c.req.raw);
  })

  routes.forEach( route => {
    app.route('', route);
  });
  
  return serve({
    fetch: app.fetch,
    port,
  });

}