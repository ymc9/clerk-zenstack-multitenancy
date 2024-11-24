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
import QueryClientProvider from "~/components/QueryClientProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

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
                <OrganizationSwitcher />
                <UserButton />
              </div>
            </SignedIn>
          </header>
          <main className="p-4">
            <QueryClientProvider>{children}</QueryClientProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
