import { useEffect } from "react";
/* LIBRARIES */
import { authClient } from "@app/shared/lib/better-auth/client"
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

export const useSession= () => {

  const data = authClient.useSession();

  return data;
}

export const useAuthActions = () => {

  const navigate = useNavigate();

  const signInFn = async ( data: { email: string, password: string }) => {
    
    await authClient.signIn.email ({
      email: data.email,
      password: data.password,
      callbackURL: `${window.location.origin}/`,
    }, {
      onSuccess: ( ) => {
        toast.success("Welcome back 🎉");
      },
      onError: ( err ) => {
        console.log("Cannot login with those credentials");
        toast.error(err.error.message);
      }
    })
  
  }
  
  const signUpFn = async (data: { email: string, password: string }) => {
  
    await authClient.signUp.email ({
      email: data.email,
      password: data.password,
      name: '',
    }, {
      onSuccess: ( ) => {
        toast.success("Thanks for your register 🎉");
        setTimeout(() => {
          navigate({ to:'/' });
        }, 1000);
      },
      onError:  ( err ) => {
        toast.error(err.error.message);
        console.log("Cannot signup with those credentials");
      },
    })
  
  }

  const googleFn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/`,
      errorCallbackURL: `${window.location.origin}/auth/login?error=google_provider`
    }, {
      onSuccess: () => {
        toast.loading("Loading Google Provider...");
      },
      onError: (err) => {
        console.log("Something was wrong with the Google Provider");
        toast.error(err.error.message);
      },
    })
  }
  
  const signOutFn = async () => {
  
    await authClient.signOut({},{
      onSuccess: () => {
        toast.success("Come back soon 👋");
        navigate({ to:'/auth/login' });
      },
      onError: (err) => {
        console.log("Cannot logout with this user");
        toast.error(err.error.message);
      }
    })
  
  }

  const updateNameFn = async ( name: string ) => {
    await authClient.updateUser({ name: name.trim() }, {
      onSuccess: () => {
        toast.success("Name update successfully");
      },
      onError: () => {
        toast.error("Something was wrong");
      }
    })
  }

  return {
    googleFn,
    signInFn,
    signUpFn,
    signOutFn,
    updateNameFn,
  }
}

export const useVerificationEmail = () => {

  const session = useSession();

  useEffect(() => {
    if(session.data?.user){
      authClient.sendVerificationEmail({ 
        email: session.data.user.email, 
        callbackURL: `${window.location.origin}/` 
      })
    }
  }, [session])

}