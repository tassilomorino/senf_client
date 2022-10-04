import { uuidv4 } from "@firebase/util";
import { getDoc } from "firebase/firestore";
import create from "zustand";

const useSurveyStore = create((set, get) => ({
  title: "",
  type: "",
  createdAt: "",
  questions: [],
  fetch: async (schemaRef) => {
    const docSnap = await getDoc(schemaRef);
    if (!docSnap.exists()) {
      //! TODO show a better indicator that such survey doesn't exist
      throw new Error("Error fetching the survey");
    }
    set({
      title: docSnap.data().title,
      type: docSnap.data().surveyType,
      questions: docSnap.data().scehma,
    });
  },
  removeQuestion: (id) =>
    set((state) => {
      if (state.questions.length > 2) {
        const updatedQuestions = [...state.questions].filter(
          (item) => item.uid !== id
        );
        return { questions: updatedQuestions };
      }
      return { questions: state.questions };
    }),
  changeQuestionType: (questionIndex) =>
    set((state) => {
      // eslint-disable-next-line no-param-reassign
      state.questions[questionIndex].qtype =
        state.questions[questionIndex].qtype === "MultipleChoice"
          ? "SingleChoice"
          : "MultipleChoice";
      return { questions: state.questions };
    }),
  addQuestion: () => {
    const newOption = {
      uid: uuidv4(),
      value: "",
    };
    return set((state) => ({ questions: [...state.questions, newOption] }));
  },
}));

export default useSurveyStore;