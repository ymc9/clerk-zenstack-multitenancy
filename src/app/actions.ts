"use server";

import { revalidatePath } from "next/cache";
import { getUserDb } from "~/server/db";

export async function createList(title: string) {
  const db = await getUserDb();
  await db.list.create({ data: { title } });
  revalidatePath("/");
}

export async function deleteList(listId: string) {
  const db = await getUserDb();
  await db.list.delete({ where: { id: listId } });
  revalidatePath("/");
}

export async function toggleListPrivate(listId: string, value: boolean) {
  const db = await getUserDb();
  await db.list.update({
    where: { id: listId },
    data: { private: value },
  });
  revalidatePath("/");
  revalidatePath(`/lists/${listId}`);
}

export async function createTodo(listId: string, title: string) {
  const db = await getUserDb();
  await db.todo.create({
    data: {
      title,
      list: { connect: { id: listId } },
    },
  });
  revalidatePath(`/lists/${listId}`);
}

export async function toggleTodoCompleted(todoId: string, value: boolean) {
  const db = await getUserDb();
  const result = await db.todo.update({
    where: { id: todoId },
    data: { completedAt: value ? new Date() : null },
  });
  revalidatePath(`/lists/${result.listId}`);
}

export async function deleteTodo(todoId: string) {
  const db = await getUserDb();
  const result = await db.todo.delete({ where: { id: todoId } });
  revalidatePath(`/lists/${result.listId}`);
}
