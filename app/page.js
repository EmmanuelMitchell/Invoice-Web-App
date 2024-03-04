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
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem
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
