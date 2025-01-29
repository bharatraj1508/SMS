"use client";

import { GraduationCap } from "lucide-react";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const { isLoaded, isSignedIn, user } = useUser();

  console.log(isLoaded);

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="flex flex-col gap-6 border border-gray-300 px-8 pb-14 pt-8 rounded-2xl shadow-2xl">
      <SignIn.Root>
        <SignIn.Step name="start">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-2 font-medium">
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <GraduationCap className="size-10" />
                </div>
              </div>
              <h1 className="text-xl font-bold">School Management System</h1>
            </div>
            <Clerk.GlobalError className="block text-sm text-red-400" />
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Clerk.Field name="identifier">
                  <Clerk.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Username
                  </Clerk.Label>
                  <Clerk.Input
                    type="text"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    required
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </div>
              <div className="grid gap-2">
                <Clerk.Field name="password">
                  <Clerk.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </Clerk.Label>
                  <Clerk.Input
                    type="password"
                    required
                    className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                  />
                  <Clerk.FieldError className="block text-sm text-red-400" />
                </Clerk.Field>
              </div>
              <SignIn.Action
                submit
                className="border border-neutral-800 bg-neutral-800 text-white p-1 rounded-md hover:bg-white hover:text-neutral-800 transition-all duration-300"
              >
                Login
              </SignIn.Action>
            </div>
          </div>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
