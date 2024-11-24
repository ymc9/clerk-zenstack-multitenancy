"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useEffect } from "react";
import TodoLists from "~/components/TodoLists";

const Home: NextPage = () => {
  const { user } = useUser();
  const { organization } = useOrganization();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [organization]);

  if (!user) {
    return <div>Please signin</div>;
  }

  return (
    <div className="container mx-auto flex justify-center">
      <div className="mt-8 flex w-full flex-col items-center">
        <h1 className="text-center text-2xl">
          Welcome{organization ? ` to "${organization?.name}"` : ""},{" "}
          {user.fullName ?? user.emailAddresses?.[0]?.emailAddress}!
        </h1>
        <TodoLists />
      </div>
    </div>
  );
};

export default Home;
