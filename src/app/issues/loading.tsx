import { Loader2Icon } from "lucide-react";

export default function loading() {
  return (
    <div className="grid place-content-center bg-white px-4">
        <Loader2Icon className="animate-spin" size={50} />
    </div>
  )
}