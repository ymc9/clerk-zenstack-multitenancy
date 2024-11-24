import CreateTodo from "~/components/CreateTodo";
import DeleteList from "~/components/DeleteList";
import PrivateListToggle from "~/components/PrivateListToggle";
import TodoComponent from "~/components/Todo";
import { getUserDb } from "~/server/db";

export default async function TodoList({
  params,
}: {
  params: Promise<{ listId: string }>;
}) {
  const { listId } = await params;
  const db = await getUserDb();

  const list = await db.list.findUnique({
    where: { id: listId },
    include: { todos: true },
  });

  if (!list) {
    return <p>List not found</p>;
  }

  return (
    <div>
      <div className="container mx-auto flex w-full flex-col items-center py-8">
        <div className="mb-4 flex flex-col items-center">
          <h1 className="mb-4 text-2xl font-semibold">{list.title}</h1>
          <div className="flex">
            <PrivateListToggle list={list} />
            <DeleteList list={list} />
          </div>
        </div>
        <div className="flex space-x-2">
          <CreateTodo list={list} />
        </div>
        <ul className="flex w-auto flex-col space-y-4 py-8">
          {list.todos.map((todo) => (
            <TodoComponent key={todo.id} value={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}
