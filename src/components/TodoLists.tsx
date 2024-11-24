"use client";

import Link from "next/link";
import { useCreateList, useFindManyList } from "~/lib/hooks";

export default function TodoLists() {
  const { data: lists } = useFindManyList({
    include: { owner: true },
    orderBy: { updatedAt: "desc" },
  });

  const { mutate: createList } = useCreateList();

  if (!lists) return null;

  function onCreateList() {
    const title = prompt("Enter a title for your list");
    if (title) {
      createList({ data: { title } });
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="p-8">
        <button className="btn btn-primary btn-wide" onClick={onCreateList}>
          Create a list
        </button>

        <ul className="mt-8 flex flex-wrap gap-6">
          {lists?.map((list) => (
            <Link href={`/lists/${list.id}`} key={list.id}>
              <li className="flex h-32 w-72 items-center justify-center rounded-lg border text-2xl">
                {list.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
