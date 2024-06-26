import { Link, useActionData, useLoaderData } from '@remix-run/react';
import styles from './NoteList.css?url';

interface Note {
    id: string;
    title: string;
    content: string;
}

interface NoteListProps {
    notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
    return (
        <ul id="note-list">
            {notes?.map((note, index) => (
                <li key={note.id} className="note">
                    <article>
                        <header>
                            <ul className="note-meta">
                                <li>#{index + 1}</li>
                                <li>
                                    <time dateTime={note.id}>
                                        {new Date(note.id).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </time>
                                </li>
                            </ul>
                            <Link to={"/notes/"+note.id}><h2>{note.title}</h2></Link>
                        </header>
                        <p>{note.content}</p>
                    </article>
                </li>
            ))}
        </ul>
    );
}

export default NoteList;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}