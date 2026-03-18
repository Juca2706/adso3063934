import { StackHandler } from "@stackframe/stack";
import BackHome from "@/components/BackHome";

export default function Handler() {
  return (
    <div className="flex flex-col gap-4 p-4 items-center justify-center hero min-h-screen"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/imgs/fondo-home.png)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}>

      <div className="bg-black/40 m-4 p-10 flex flex-col gap-4 rounded backdrop-blur-md">
        <StackHandler fullPage={false} />
        <BackHome />
      </div>
    </div>

  )
}
