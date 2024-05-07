import { ActionFunctionArgs, LinksFunction, MetaFunction, json, redirect } from "@remix-run/node";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import NewNote , {links as NewNoteStyle} from "~/components/NewNote/NewNote";
import NoteList, {links as NoteListStyle} from "~/components/NoteList/NoteList";
import { getStoredNotes,storeNotes } from "~/data/notes";

export const meta: MetaFunction = () => {
  return [
    { title: "Notes App list" },
    { name: "description", content: "Welcome to Notes app list!" },
  ];
};

export default function NotesPage() {
  const {notes} = useLoaderData<typeof loader>();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes}/>
    </main>
  )
}

export const links: LinksFunction = () => [...NewNoteStyle(),...NoteListStyle()];


export const loader = async () => {
  const existingNotes = await getStoredNotes(); 
  if(existingNotes.length === 0){
    throw json({message: "No notes found"},{status: 404, statusText: "No notes found"});
  }
  return json({ notes: existingNotes });
};

export const action = async ({request}:ActionFunctionArgs) => {
  const body = await request.formData();

  const noteData = {
    id: new Date().toISOString(),
    ...Object.fromEntries(body)
  }

  if(noteData?.title.trim().length < 5  ){
    return json({message: "Title must be longer than 5 characters"},{
      status: 400
    });
  } 

  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect(`/notes`);
}


export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return (
      <main className="error">
          <h1>Oh no! catch error</h1>
          <p>Something went wrong here.</p>
          <p>{error.message}</p>
        </main>
    );
  }
  else{
  return (
    <main className="error">
        <h1>Oh no!</h1>
        <p>Something went wrong here.</p>
        <p>{error.message}</p>
      </main>
  );
}
}