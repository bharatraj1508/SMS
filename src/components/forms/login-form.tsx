"use client";

import { GraduationCap, LoaderCircle } from "lucide-react";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function LoginForm() {
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    const role = user?.publicMetadata.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <SignIn.Root>
      <Clerk.Loading>
        {(isGlobalLoading) => (
          <>
            <div className="flex flex-col gap-6 border border-gray-300 px-8 pb-14 pt-8 rounded-2xl shadow-2xl">
              <SignIn.Step name="start">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center gap-2 font-medium">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md">
                        <GraduationCap className="size-10" />
                      </div>
                    </div>
                    <h1 className="text-xl font-bold">
                      School Management System
                    </h1>
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
                          className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
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
                          className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
                        />
                        <Clerk.FieldError className="block text-sm text-red-400" />
                      </Clerk.Field>
                    </div>
                    <SignIn.Action submit asChild>
                      <Button
                        disabled={isGlobalLoading}
                        className="w-full border border-neutral-800 bg-neutral-800 text-white p-1 rounded-md hover:bg-white hover:text-neutral-800 transition-all duration-300"
                      >
                        <Clerk.Loading>
                          {(isLoading) => {
                            return isLoading ? (
                              <LoaderCircle className="size-4 animate-spin" />
                            ) : (
                              "Login"
                            );
                          }}
                        </Clerk.Loading>
                      </Button>
                    </SignIn.Action>
                  </div>
                </div>
              </SignIn.Step>
            </div>
          </>
        )}
      </Clerk.Loading>
    </SignIn.Root>
  );
}
