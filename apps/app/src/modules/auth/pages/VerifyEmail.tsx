/* LIBRARIES */
import { LogOut } from "lucide-react";
/* SHADCN */
import { Card, CardContent, CardHeader } from "~/shadcn/ui/card";
import { Button } from "~/shadcn/ui/button";
/* APP */
import { config } from "@app/config";
import { useAuthActions, useSession, useVerificationEmail } from "../hooks/useAuth"

export default function VerifyEmailPage() {

  const { signOutFn } = useAuthActions();
  const session = useSession();
  useVerificationEmail();

  return (
    <div className="p-2 relative h-screen grid place-content-center">
      <div className="absolute right-2 top-2">
        <Button className="flex items-center gap-1" variant={"outline"} onClick={signOutFn}>
          <LogOut/>
          <span>Logout</span>
        </Button>
      </div>
      <div className="flex flex-col gap-2 max-w-xl">
        <span className="px-2 text-sm text-muted-foreground opacity-30 font-bold select-none">— Action required</span>
        <Card className="max-w-xl flex flex-col gap-2">
          <CardHeader className="flex flex-col gap-1.5">
            <h2 className="text-2xl font-bold">Verify Your Email to Get Started</h2>
            <span className="text-lg font-medium text-muted-foreground">Hey {session.data?.user.email}!</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 text-muted-foreground opacity-80">
              <p>
                Welcome to {config.app.name}! Please verify your email to activate your account.
              </p>
              <p>
                We've sent a verification email—check your inbox (or spam folder) and click the link to confirm.
              </p>
              <p>
                Need help? Reach out anytime!
              </p>
            </div>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <span>Happy logging!</span>
              <span>— The {config.app.name} Team</span>
            </div>
          </CardContent>
        </Card>
        <span className="px-2 self-end text-sm text-muted-foreground opacity-30 font-bold select-none">{config.app.name}</span>
      </div>
    </div>
  )


} 