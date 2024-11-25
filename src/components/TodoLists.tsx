import Link from "next/link";
import { getUserDb } from "~/server/db";
import CreateList from "./CreateList";

export default async function TodoLists() {
  const db = await getUserDb();

  const lists = await db.list.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="container mx-auto mt-8">
      <div className="p-8">
        <CreateList />

        <ul className="mt-8 flex flex-wrap gap-6">
          {lists?.map((list) => (
            <Link href={`/lists/${list.id}`} key={list.id}>
              <li className="relative flex h-28 w-64 items-center justify-center rounded-lg border text-xl">
                {list.title}
                {list.private && (
                  <span className="absolute bottom-3 right-3 text-xs font-light italic">
                    Private
                  </span>
                )}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
