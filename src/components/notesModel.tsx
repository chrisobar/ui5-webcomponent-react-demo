export interface INoteProps {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
  toggleAddNote: boolean;
  setToggleAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  noteForm: INote;
  setNoteForm: React.Dispatch<React.SetStateAction<INote>>;
}
export interface INote {
  id: number;
  title: string;
  content: string;

  dateModified: string;
}
export const NotesData = [
  {
    id: 1,
    title: "Meeting Notes",
    content: "Discussed project goals and deadlines.",
    dateModified: "2024-10-24T08:45:30.123Z",
  },
  {
    id: 2,
    title: "Grocery List",
    content: "Milk, eggs, bread, and coffee.",
    dateModified: "2024-10-23T09:15:22.456Z",
  },
  {
    id: 3,
    title: "Workout Routine",
    content: "Cardio on Monday, weights on Wednesday, yoga on Friday.",
    dateModified: "2024-10-22T10:30:40.789Z",
  },
  {
    id: 4,
    title: "Book Ideas",
    content: "Outline for new sci-fi novel series.",
    dateModified: "2024-10-21T11:00:12.321Z",
  },
  {
    id: 5,
    title: "Recipe for Pasta",
    content: "Ingredients: pasta, tomatoes, basil, garlic, and olive oil.",
    dateModified: "2024-10-20T14:12:45.654Z",
  },
  {
    id: 6,
    title: "Travel Itinerary",
    content: "Visit Paris, Rome, and Amsterdam over 2 weeks.",
    dateModified: "2024-10-19T15:20:33.987Z",
  },
  {
    id: 7,
    title: "Birthday Gift Ideas",
    content: "Books, plants, and art supplies.",
    dateModified: "2024-10-18T16:45:50.321Z",
  },
  {
    id: 8,
    title: "Work To-Do List",
    content: "Finish report, email updates, and attend team meeting.",
    dateModified: "2024-10-17T17:55:43.654Z",
  },
  {
    id: 9,
    title: "Coding Project",
    content:
      "For this project, the main objectives are to build a responsive front-end interface and ensure smooth integration with the back-end API. The design should be clean, intuitive, and work well on both mobile and desktop. The project includes user authentication, data fetching, and state management using React and Redux. The API needs to handle requests swiftly and provide data for users to interact with in real-time. Additional tasks include setting up error handling, loading states, and testing. All project documentation should be updated as changes are made, ensuring everything is well-documented and maintainable.",
    dateModified: "2024-10-16T18:35:29.456Z",
  },
  {
    id: 10,
    title: "Weekend Plans",
    content:
      "This weekend, the plan is to start with an early morning hike at the nearby nature reserve, which will take roughly 3-4 hours. After the hike, we’ll return home for a quick break, then head out for a casual lunch. Later, we plan to watch a new movie at the local theater. In the evening, we’ll be having dinner with friends at our favorite restaurant, which will be a great opportunity to catch up. On Sunday, it will be a more relaxing day, with some reading, light exercise, and preparing meals for the week ahead. Finally, winding down with a good TV show.",
    dateModified: "2024-10-15T19:45:16.789Z",
  },
];
