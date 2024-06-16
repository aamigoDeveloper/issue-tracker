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
import Image from "next/image"
import Link from "next/link"
import { getUsersIssues } from "@/actions/userActions"
import { Badge } from "./ui/badge"

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
  const usersIssues = getUsersIssues({ userId: user.id })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user.picture ? (
          <Image
            src={user.picture!}
            alt="User Profile"
            className="rounded-full cursor-pointer"
            width={35}
            height={35}
          />
        ) : (
          <Image
            src={"/placeholder.jfif"}
            alt="User Profile"
            className="rounded-full cursor-pointer"
            width={35}
            height={35}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="space-y-1">
            <DropdownMenuItem disabled className="p-1">
              {user.given_name}
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="p-1">
              {user.email}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex items-center justify-between">
              My Issues
              <Badge variant={"outline"}>{usersIssues}</Badge>
            </DropdownMenuLabel>
            <Link href={`/profile/${user.id}`}>
              <DropdownMenuItem className="p-1">Issues</DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            asChild
            className="w-full focus-visible:ring-transparent focus-visible:ring-0 bg-blue-600 hover:bg-blue-500 dark:text-white text-white hover:text-white"
            variant={"ghost"}
          >
            <LogoutLink>Sign out</LogoutLink>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
