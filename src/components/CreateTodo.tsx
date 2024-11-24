"use client";

import { List } from "@prisma/client";
import { useState } from "react";
import { createTodo } from "~/app/actions";

export default function CreateTodo({ list }: { list: List }) {
  const [title, setTitle] = useState("");

  function onCreate() {
    if (!title) {
      return;
    }
    createTodo(list.id, title);
    setTitle("");
  }

  return (
    <input
      type="text"
      placeholder="Type a title and press enter"
      className="input input-bordered mt-2 w-72 max-w-xs"
      value={title}
      autoFocus
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onCreate();
        }
      }}
      onChange={(e) => {
        setTitle(e.currentTarget.value);
      }}
    />
  );
}
