import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { getStoredNotes } from "~/data/notes";
import style from '~/styles/note-details.css?url';

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  const existingNotes = await getStoredNotes(); 
  const note = existingNotes.find((note) => note.id === params.noteId);
  if (!note) {
    throw json({message:"Not Note Found"}, { status: 404 });
  }
  return json({ note });
};

export default function NoteDetail() {
  const { note } = useLoaderData();
  return (
    <main id="note-details">
        <header>
            <nav>
                <Link to="/notes">Back to All notes</Link>
            </nav>
            <h1>{note.title}</h1>
        </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: style }];
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <main className="error">
          <h1>Oh no! catch error</h1>
          <p>Any note found with this note id</p>
          <p>{error.data.message}</p>
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