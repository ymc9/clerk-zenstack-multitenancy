import "~/styles/globals.css";

import {
  ClerkProvider,
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <header className="p-4">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <div className="flex justify-between">
                <Link href="/">
                  <h1>Home</h1>
                </Link>
                <div className="flex gap-2">
                  <OrganizationSwitcher />
                  <UserButton />
                </div>
              </div>
            </SignedIn>
          </header>
          <main className="p-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
