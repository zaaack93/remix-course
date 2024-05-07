import { ActionFunctionArgs, LinksFunction, redirect } from "@remix-run/node";
import NewNote , {links as NewNoteStyle} from "~/components/NewNote/NewNote";
import { getStoredNotes,storeNotes } from "~/data/notes";


export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  )
}

export const links: LinksFunction = () => [...NewNoteStyle()];


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