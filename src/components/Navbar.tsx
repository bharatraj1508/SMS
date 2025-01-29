import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import {
  User,
  Settings,
  LogOut,
  Volume2,
  MessageCircleMore,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
      </div>

      {/* <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src="/avatar.png"
              alt=""
              width={36}
              height={36}
              className="rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-semibold">Bharat Raj Verma</span>
                <span className="text-xs text-gray-400">Admin</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Volume2 /> Announcements
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageCircleMore /> Messages
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
      <UserButton />
    </div>
  );
}
