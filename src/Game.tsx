import { Card, List, ListItem, ListItemButton, ListItemText,  Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import { type Question as QuestionType } from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Question = ({ info } : { info: QuestionType}) => {

	const selectAnswer = useQuestionsStore(state => state.selectAnswer)
	const createHandleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex)
	}

	const getBackgroundColor = (index: number) => {
		const { userSelectedAnswer, correctAnswer} = info
		// 1:03:09 de video 
	}

	return (
		<Card variant="outlined" sx={{ bgcolor: '#222', p:2, textAlign: 'left', color: 'white', marginTop: 4}}>
			<Typography variant="h5" >
				{info.question}
			</Typography>
			<SyntaxHighlighter 
				language="javascript"
				style={gradientDark}>
					{info.code}
			</SyntaxHighlighter>

			<List sx={{ bgcolor: '#333',  }} disablePadding>
				{info.answers?.map((answer, index) => (
					<ListItem key={index} disablePadding divider>
						<ListItemButton onClick={createHandleClick(index)}>
							<ListItemText primary={answer} sx={{ textAlign: 'center'}}/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Card>
	)
}


export const Game =  () => {

	const questions = useQuestionsStore(state => state.questions);
	const currentQuestion = useQuestionsStore(state => state.currentQuestion);

	console.log(questions);
	

	const questionInfo = questions[currentQuestion]
	return (
		<>
			<Question  info={questionInfo}/>
		</>
	)
}