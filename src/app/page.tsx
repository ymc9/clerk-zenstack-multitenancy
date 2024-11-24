import { currentUser } from "@clerk/nextjs/server";
import type { NextPage } from "next";
import TodoLists from "~/components/TodoLists";

const Home: NextPage = async () => {
  const user = await currentUser();

  if (!user) {
    return <div>Please signin</div>;
  }

  return (
    <div className="container mx-auto flex justify-center">
      <div className="mt-8 flex w-full flex-col items-center">
        <h1 className="text-center text-2xl">
          Welcome, {user.fullName ?? user.emailAddresses?.[0]?.emailAddress}!
        </h1>
        <TodoLists />
      </div>
    </div>
  );
};

export default Home;
