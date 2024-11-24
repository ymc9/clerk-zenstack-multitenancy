"use client";

import { List } from "@prisma/client";
import { toggleListPrivate } from "~/app/actions";

export default function PrivateListToggle({ list }: { list: List }) {
  return (
    <button
      className="btn btn-link btn-xs"
      onClick={() => {
        toggleListPrivate(list.id, !list.private);
      }}
    >
      {list.private ? "Set Public" : "Set Private"}
    </button>
  );
}
