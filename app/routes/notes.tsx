import { LinksFunction } from "@remix-run/node";
import NewNote , {links as NewNoteStyle} from "~/components/NewNote/NewNote";

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  )
}

export const links: LinksFunction = () => [...NewNoteStyle()];