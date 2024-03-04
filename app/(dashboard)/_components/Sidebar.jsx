import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  return (
    <>
      <aside className="hidden fixed lg:flex flex-col justify-between h-screen w-48 bg-teal-800 p-4">
        {/* <aside className="flex flex-col items-center justify-between gap-4 h-screen"> */}
        <Button variant="secondary">Welcome</Button>

        <ul className="space-y-4 flex-1 mt-5 mx-auto text-center">
          <li>
            <Button variant="customOutline">
              <Link href="/">Dashboard</Link>
            </Button>
          </li>
          <li>
            <Button variant="customOutline">
              <Link href="/">Setting</Link>
            </Button>
          </li>
          <li>
            <Button variant="customOutline">
              <Link href="/">Private Policy</Link>
            </Button>
          </li>
        </ul>
        <p className="text-slate-400">&copy;Emmanuel Mitchell</p>
        {/* </aside> */}
      </aside>
    </>
  );
}
