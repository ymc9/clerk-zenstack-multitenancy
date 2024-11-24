"use client";

import { List } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteList } from "~/app/actions";

export default function DeleteList({ list }: { list: List }) {
  const router = useRouter();
  return (
    <button
      className="btn btn-link btn-xs"
      onClick={() => {
        deleteList(list.id);
        router.push("/");
      }}
    >
      Delete
    </button>
  );
}
