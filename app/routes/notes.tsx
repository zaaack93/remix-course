import { ActionFunctionArgs, LinksFunction, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NewNote , {links as NewNoteStyle} from "~/components/NewNote/NewNote";
import NoteList, {links as NoteListStyle} from "~/components/NoteList/NoteList";
import { getStoredNotes,storeNotes } from "~/data/notes";


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


export const action = async ({request}:ActionFunctionArgs) => {
  const body = await request.formData();

  const noteData = {
    id: new Date().toISOString(),
    ...Object.fromEntries(body)
  }

  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  return redirect(`/notes`);
}

export const loader = async () => {
  const existingNotes = await getStoredNotes(); 
  return json({ notes: existingNotes });
};