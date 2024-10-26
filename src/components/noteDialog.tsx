import {
  Bar,
  Button,
  Dialog,
  Form,
  FormGroup,
  FormItem,
  Input,
  Label,
  TextArea,
  Toast,
} from "@ui5/webcomponents-react";
import * as React from "react";
import "../App.css";
import { INote, INoteProps, NotesData } from "./notesModel";

interface INotePropsEx extends INoteProps {
  notesData: INote[];
  setNotesData: React.Dispatch<React.SetStateAction<INote[]>>;
}
export function NoteDialog({
  mode,
  setMode,
  toggleAddNote,
  setToggleAddNote,
  noteForm,
  setNoteForm,
  notesData,
  setNotesData,
}: INotePropsEx) {
  const [busyCrud, setBusyCrud] = React.useState<boolean>(false);
  const [crudToast, setCrudToast] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (mode === "Add") {
      setNoteForm({
        id: 0,
        title: "",
        content: "",
        dateModified: new Date().toISOString(),
      });
    }
  }, [setNoteForm]);

  function onCRUDNote() {
    setBusyCrud(true);
    setCrudToast(false);
    if (mode === "Add") {
      const newNote: INote = {
        id:
          NotesData.length > 0
            ? Math.max(...NotesData.map((note) => note.id)) + 1
            : 1,
        title: noteForm.title,
        content: noteForm.content,
        dateModified: new Date().toISOString(),
      };
      setTimeout(() => {
        setCrudToast(true);
      }, 1000);

      setTimeout(() => {
        setNotesData((prev) => {
          const updatedNotes = [...prev, newNote];
          return updatedNotes.sort(
            (a, b) =>
              new Date(b.dateModified).getTime() -
              new Date(a.dateModified).getTime()
          );
        });
        setToggleAddNote(false);
        setNoteForm({
          id: 0,
          title: "",
          content: "",
          dateModified: "",
        });
        setMode("");
        setBusyCrud(false);
      }, 2000);
    } else {
      const updatedNote = notesData.map((note) =>
        note.id === noteForm.id
          ? { ...note, ...noteForm, dateModified: new Date().toISOString() }
          : note
      );
      const sortedNotes = [...updatedNote].sort(
        (a, b) =>
          new Date(b.dateModified).getTime() -
          new Date(a.dateModified).getTime()
      );
      setTimeout(() => {
        setCrudToast(true);
      }, 1000);

      setTimeout(() => {
        setNotesData(sortedNotes);

        setToggleAddNote(false);
        setNoteForm({
          id: 0,
          title: "",
          content: "",
          dateModified: "",
        });
        setMode("");
        setBusyCrud(false);
      }, 2000);
    }
  }

  return (
    <Dialog
      accessibleRole="Dialog"
      state="Information"
      draggable
      open={toggleAddNote}
      headerText={mode === "Add" ? "Create New Note" : "Edit Note"}
      className="addNoteDialog"
      footer={
        <Bar
          design="Footer"
          endContent={
            <>
              {" "}
              <Button
                design="Emphasized"
                onClick={onCRUDNote}
                disabled={busyCrud ? true : false}
              >
                {mode === "Add"
                  ? "Create"
                  : mode === "Edit"
                  ? "Update"
                  : busyCrud
                  ? "Confirming..."
                  : ""}
              </Button>
              <Button
                design="Default"
                onClick={() => {
                  setToggleAddNote(false);
                  setMode("");
                }}
              >
                Cancel
              </Button>
            </>
          }
        ></Bar>
      }
    >
      <Form itemSpacing="Large">
        {" "}
        <FormGroup>
          <FormItem labelContent={<Label>Title: </Label>}>
            <Input
              type="Text"
              value={noteForm.title}
              onChange={(e) =>
                setNoteForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </FormItem>
          <FormItem labelContent={<Label>Content: </Label>}>
            <TextArea
              growing
              style={{ height: "200px" }}
              value={noteForm.content}
              onChange={(e) =>
                setNoteForm((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </FormItem>
        </FormGroup>
      </Form>
      <Toast open={crudToast} placement="BottomCenter">
        {mode === "Add"
          ? "Note created successfully"
          : mode === "Edit"
          ? "Note updated successfully"
          : ""}
      </Toast>
    </Dialog>
  );
}
