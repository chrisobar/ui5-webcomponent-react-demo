import {
  Card,
  CheckBox,
  CheckBoxDomRef,
  Label,
  Text,
  Title,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";

import { INote, INoteProps } from "./notesModel";

interface INotePropsEx extends INoteProps {
  toggleDelete: boolean;
  setSelectedNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}
export function NotesCard({
  setMode,
  noteForm,
  setNoteForm,
  setToggleAddNote,
  toggleDelete,

  setSelectedNotes,
}: INotePropsEx) {
  function setEditMode() {
    if (toggleDelete) return;
    else {
      setToggleAddNote(true);
      setNoteForm(noteForm);
      setMode("Edit");
    }
  }
  function onSelectNotesDeletion(e: Ui5CustomEvent<CheckBoxDomRef, never>) {
    if (e.target.checked) {
      setSelectedNotes((prev) => [...prev, noteForm]);
    } else {
      setSelectedNotes((prev) =>
        prev.filter((note) => note.id !== noteForm.id)
      );
    }
  }
  return (
    <>
      {" "}
      <Card
        className={`notesCard ${toggleDelete ? "notesCard-delete" : ""}`}
        onClick={setEditMode}
        key={noteForm.id}
      >
        {toggleDelete ? (
          <CheckBox
            key={noteForm.id}
            style={{ position: "absolute", top: "10px", right: "10px" }}
            onChange={onSelectNotesDeletion}
          />
        ) : null}
        <Title style={{ position: "absolute", top: "10%", left: "10px" }}>
          {noteForm.title}
        </Title>
        <Text style={{ position: "absolute", top: "30%", left: "10px" }}>
          {noteForm.content.slice(0, 100)}
        </Text>
        <Label style={{ position: "absolute", bottom: "10%", left: "10px" }}>
          {noteForm.dateModified.slice(0, 10)}
        </Label>
      </Card>
    </>
  );
}
