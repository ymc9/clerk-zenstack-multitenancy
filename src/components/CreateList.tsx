"use client";

import { createList } from "~/app/actions";

export default function CreateList() {
  function onCreate() {
    const title = prompt("Enter a title for your list");
    if (title) {
      createList(title);
    }
  }

  return (
    <button className="btn btn-primary btn-wide" onClick={onCreate}>
      Create a list
    </button>
  );
}
