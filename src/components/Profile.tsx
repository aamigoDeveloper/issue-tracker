import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs"
import { Button } from "./ui/button"

interface ProfileProps {
  user: {
    id: string
    email: string | null
    given_name: string | null
    family_name: string | null
    picture: string | null
  }
}

export default function Profile({ user }: ProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>Profile</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="space-y-1">
            <DropdownMenuItem disabled>{user.given_name}</DropdownMenuItem>
            <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button asChild className="w-full" variant={"ghost"}>
            <LogoutLink>Sign out</LogoutLink>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
