import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  return (
    <div>
      <header className="flex  items-center justify-between  p-2">
        <Button variant="outline">
          <Link href="/">Invoice</Link>
        </Button>
        {userId ? (
          <Button>
            <Link href="/">Go to Dashboard</Link>
          </Button>
        ) : (
          <ul className="flex items-center gap-4">
            <li>
              <Button variant="secondary">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </li>

            <li>
              <Button>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </li>
          </ul>
        )}
      </header>

      <section className="relative py-32 space-y-10 max-w-4xl mx-auto text-center">
        <div className="absolute left-0 top-0 w-40 h-40 bg-green-900 blur-[85px]"></div>
        <div className="absolute right-0 bottom-0 w-40 h-40 bg-blue-900 blur-[85px]"></div>
        <h2 className="text-2xl font-bold text-gray-500">
          Welcom to Invoice App V1
        </h2>
        <p className="text-gray-500">
          Easily create invoices for yourself, your clients all at the
          convenience of your mobile phone or PC. Version 2 offers improved
          performance, better responsiveness on mobile, and better UI design by
          Thomas Sankara.
        </p>

        {userId ? (
          <Button>
            <Link href="/">Go to Dashboard</Link>
          </Button>
        ) : (
          <ul className="flex justify-center items-center gap-4">
            <li>
              <Button variant="secondary">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </li>

            <li>
              <Button>
                <Link href="/sign-In">Sign In</Link>
              </Button>
            </li>
          </ul>
        )}
      </section>
    </div>
  );
}
