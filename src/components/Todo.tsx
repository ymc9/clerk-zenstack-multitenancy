"use client";

import type { Todo } from "@prisma/client";
import { deleteTodo, toggleTodoCompleted } from "~/app/actions";

type Props = {
  value: Todo;
};

export default function TodoComponent({ value }: Props) {
  function onDelete() {
    deleteTodo(value.id);
  }

  function onToggleCompleted() {
    toggleTodoCompleted(value.id, !value.completedAt);
  }

  return (
    <div className="flex w-96 flex-col items-center rounded-lg border px-8 py-4">
      <div className="flex w-full justify-between">
        <h3
          className={`flex items-center text-xl
                        ${
                          value.completedAt
                            ? "italic text-gray-400 line-through"
                            : "text-gray-700"
                        }
                    }`}
        >
          {value.title}
        </h3>
        <div className="flex">
          <input
            type="checkbox"
            className="checkbox mr-2"
            checked={!!value.completedAt}
            onChange={() => onToggleCompleted()}
          />
          <button className="btn btn-ghost btn-xs" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
