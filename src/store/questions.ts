import { create } from "zustand";
import { type Question } from "../types";

interface State {
	questions: Question[];
	currentQuestion: number; 
	fetchQuestions: (limit: number) => Promise<void>
	selectAnswer: (questionId: number, answerIndex: number) => void
}

export const useQuestionsStore = create<State>((set, get) => {
	return {
		questions: [],
		currentQuestion: 0, // Position of the Array Questions

		fetchQuestions: async (limit: number) => {
			const res = await fetch('http://localhost:5173/data.json');
			const json = await res.json()

			const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
			set({ questions });
			
			
		},
		selectAnswer: (questionId: number, answerIndex: number) => {
		// usar el structuredClone para clonar el objeto 
		const { questions } = get()
		const newQuestions = structuredClone(questions);
		//find out the index of the question
		const questionIndex = newQuestions.findIndex(q => q.id === questionId)
		// Find out the information of the Question
		const questionInfo = newQuestions[questionIndex];
		// find out if the user selected the correct question 
		const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
		// we change the information in the copy of the answer
			newQuestions[questionIndex] = {
				...questionInfo,
                isCorrectUserAnswer,
				userSelectedAnswer: answerIndex,
			}
		//Update the state
			set({ questions: newQuestions})
	}
	}

	
})

