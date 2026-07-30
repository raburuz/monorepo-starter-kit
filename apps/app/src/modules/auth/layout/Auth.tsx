
/* React */
import { useEffect } from "react"

/* LIBRARIES */
import { Outlet } from "@tanstack/react-router"

/* APP */
import { useKillAppData } from "@/shared/hooks/useKillAppData"
import { config } from "@app/config"

/* COMPONENT */
export const AuthLayout = () => {
  const { killData } = useKillAppData()

  useEffect(() => {
    killData();
  }, [killData])
  

  return (
    <main className="relative h-screen grid place-content-center px-2">
      <div className="absolute top-2 left-2 flex flex-row items-center gap-0.5">
        <span className="text-md font-bold text-zinc-800">{config.app.name}</span>
      </div>
      <div className="hidden lg:block fixed w-full h-screen -z-10 before:absolute before:w-full before:h-screen before:bg-auth"></div>
      <Outlet/>
    </main>
  )
}
