"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import TodoComponent from "~/components/Todo";
import {
  useCreateTodo,
  useFindManyTodo,
  useFindUniqueList,
  useUpdateList,
} from "~/lib/hooks";

export default function TodoList() {
  const { listId } = useParams<{ listId: string }>();

  const { data: list, isLoading } = useFindUniqueList({
    where: { id: listId },
  });

  const { mutate: create } = useCreateTodo({ optimisticUpdate: true });
  const { mutate: updateList } = useUpdateList({ optimisticUpdate: true });
  const { data: todos } = useFindManyTodo({
    where: { listId },
    orderBy: { createdAt: "desc" },
  });

  const [title, setTitle] = useState("");

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (!list) {
    return <p>List not found</p>;
  }

  function onCreate() {
    create({
      data: {
        title,
        list: { connect: { id: listId } },
      },
    });
    setTitle("");
  }

  function onTogglePrivate() {
    if (list) {
      updateList({ where: { id: listId }, data: { private: !list.private } });
    }
  }

  return (
    <div>
      <div className="container mx-auto flex w-full flex-col items-center py-8">
        <div className="flex items-baseline gap-2">
          <h1 className="mb-4 text-2xl font-semibold">{list.title}</h1>
          <button className="btn btn-link btn-xs" onClick={onTogglePrivate}>
            Set {list.private ? "Public" : "Private"}
          </button>
        </div>
        <div className="flex space-x-2">
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
        </div>
        <ul className="flex w-auto flex-col space-y-4 py-8">
          {todos?.map((todo) => (
            <TodoComponent
              key={todo.id}
              value={todo}
              optimistic={todo.$optimistic}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
