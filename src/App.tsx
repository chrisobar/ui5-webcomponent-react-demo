import * as React from "react";
import "./App.css";
import {
  BusyIndicator,
  Button,
  InputDomRef,
  Toast,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { INote, NotesData } from "./components/notesModel";
import { NotesCard } from "./components/notes";
import Header from "./components/header";
import { NoteDialog } from "./components/noteDialog";

// icons
import "@ui5/webcomponents-icons/dist/add-document";
import "@ui5/webcomponents-icons/dist/eraser";
import "@ui5/webcomponents-icons/dist/sys-cancel";

export default function App() {
  const sortedNotes = [...NotesData].sort(
    (a, b) =>
      new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime()
  );
  const [notesData, setNotesData] = React.useState(sortedNotes);
  console.log(notesData);
  const [notesToast, setNotesToast] = React.useState<boolean>(false);
  const [busy, setBusy] = React.useState<boolean>(false);
  const [noteForm, setNoteForm] = React.useState({
    id: 0,
    title: "",
    content: "",
    dateModified: "",
  });
  const [toggleAddNote, setToggleAddNote] = React.useState<boolean>(false);
  const [toggleDelete, setToggleDelete] = React.useState<boolean>(false);
  const [mode, setMode] = React.useState<string>("");
  const [selectedNotes, setSelectedNotes] = React.useState<INote[]>([]);

  function onSearchNotes(e: Ui5CustomEvent<InputDomRef, never>) {
    setNotesToast(false);
    setBusy(true);
    console.log(e.target?.value);
    const searchValue = e.target.value;
    setTimeout(() => {
      const filteredNotes = NotesData.filter((notes) =>
        notes.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (filteredNotes.length > 0) {
        setNotesData(filteredNotes);
        setBusy(false);
        return;
      } else {
        console.log("not ofund");
        setNotesData(NotesData);
        setBusy(false);
        setNotesToast(true);
      }
    }, 2000);
  }

  // Keyboard actions
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "n") {
        setToggleAddNote(true);
      } else if (event.key === "Escape") {
        setToggleAddNote(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  console.log(selectedNotes);
  function onDeleteNotes() {
    if (selectedNotes.length > 0) {
      setBusy(true);
      const updatedNotes = notesData.filter(
        (note) =>
          !selectedNotes.some((selectedNote) => selectedNote.id === note.id)
      );
      setTimeout(() => {
        setBusy(false);
        setNotesData(updatedNotes);
        setToggleDelete(false);
        setSelectedNotes([]);
        alert("Deleted!");
      }, 2000);
    } else {
      alert("Please select notes to delete!");
    }
  }

  return (
    <>
      <Header onSearchNotes={onSearchNotes} />{" "}
      <div className="appContainer">
        <div className="notesMenu">
          {toggleDelete ? (
            <>
              <Button
                design="Negative"
                style={{ position: "absolute", left: "10px" }}
                onClick={onDeleteNotes}
              >
                Delete({selectedNotes.length})
              </Button>
              <Button
                design="Default"
                icon="sys-cancel"
                onClick={() => setToggleDelete(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              design="Default"
              icon="eraser"
              onClick={() => setToggleDelete(true)}
            >
              Delete Notes
            </Button>
          )}

          <Button
            design="Emphasized"
            icon="add-document"
            onClick={() => {
              setToggleAddNote(true);
              setMode("Add");
            }}
          >
            Add Note
          </Button>
        </div>
        <center>
          {" "}
          <div className="notesContainer">
            {" "}
            {busy ? (
              <BusyIndicator
                active
                size="M"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            ) : (
              notesData.map((notes) => (
                <NotesCard
                  key={notes.id}
                  mode={mode}
                  setMode={setMode}
                  noteForm={notes}
                  toggleAddNote={toggleAddNote}
                  setNoteForm={setNoteForm}
                  setToggleAddNote={setToggleAddNote}
                  toggleDelete={toggleDelete}
                  setSelectedNotes={setSelectedNotes}
                />
              ))
            )}
          </div>
          {toggleAddNote ? (
            <NoteDialog
              mode={mode}
              setMode={setMode}
              toggleAddNote={toggleAddNote}
              setToggleAddNote={setToggleAddNote}
              noteForm={noteForm}
              setNoteForm={setNoteForm}
              notesData={notesData}
              setNotesData={setNotesData}
            />
          ) : null}
          <Toast open={notesToast} placement="BottomCenter">
            Notes not found
          </Toast>
        </center>
      </div>
    </>
  );
}
