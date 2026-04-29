import { createMiddleware } from 'hono/factory'
import { Context, Hono } from 'hono'
import { auth } from '../lib/better-auth/server'

type Env = {
    Variables: {
        userId: string,
    }
}

const AUTH_KEY = 'userId';

export const authMidddleware = createMiddleware<Env>( async ( c, next ) => {

    const session = await auth.api.getSession({
        headers: c.req.raw.headers,
    });

    if(!session?.session || !session.user) {
        return c.json({ message: "unauthorized" }, 401);
    }

    c.set(AUTH_KEY, session.user.id);
    
    await next();

})


export const getAuth = ( c: Context<Env> ) => {

    const userId = c.var.userId;

    if(!userId) return c.json({ message: 'unauthorized' }, 401);

    return userId

}

export const authRouter = new Hono().use(authMidddleware);