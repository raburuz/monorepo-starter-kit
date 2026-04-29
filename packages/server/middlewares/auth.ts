import { Context, Hono } from "hono";
import { createMiddleware } from "hono/factory"
import { auth } from "@app/shared/lib/better-auth/server";

type Env = {
  Variables: {
    userId: string | null;
  }
}

export const CUSTOMER_KEY = 'userId';

export const authMiddleware = createMiddleware<Env>( async (c, next ) => {
    
    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    })
    
    if(!session || !session.user) {
        c.set(CUSTOMER_KEY, null);
        return c.json(null, 401);
    }
    
    c.set(CUSTOMER_KEY, session.user.id);
    
    await next();
    
})

export const getAuthUserIdOrThrow = ( c: Context<Env> ) => {
    
    const userId = c.get(CUSTOMER_KEY);
    
    if(!userId) return c.json(null, 401);
    
    return userId;
    
} 

export const authRoute = new Hono<Env>().use(authMiddleware);

