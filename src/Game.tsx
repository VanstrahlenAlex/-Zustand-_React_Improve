import { Card, IconButton, List, ListItem, ListItemButton, ListItemText,  Stack,  Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import { type Question as QuestionType } from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";



const getBackgroundColor = (info: QuestionType ,index: number) => {
		const { userSelectedAnswer, correctAnswer} = info
		// 1:03:09 de video 
		if( userSelectedAnswer == null) return 'transparent';
		//If user selected the incorrect answer
		if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent';
		//If the user selected the correct answer
		if(index === correctAnswer) return 'green';
		//If this is the answer of the user but not the correct answer
		if(index === userSelectedAnswer) return 'red';
		//If not is none of the correct answers
		return 'transparent';
	}

const Question = ({ info } : { info: QuestionType}) => {

	const selectAnswer = useQuestionsStore(state => state.selectAnswer)
	const createHandleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex)
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
						<ListItemButton
							diseabled={info.userSelectedAnswer !== null}
							onClick={createHandleClick(index)}
							sx={{
								backgroundColor:getBackgroundColor(info, index)
							}}
							>
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
	const goNextQuestion = useQuestionsStore(state => state.goNextQuestion);
	const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion);
	
	const questionInfo = questions[currentQuestion];


	return (
		<>
			<Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
				<IconButton 
					onClick={goPreviousQuestion} 
					disabled={currentQuestion === 0}>
					<ArrowBackIosNew  />
				</IconButton>

				<IconButton 
					onClick={goNextQuestion} 
					disabled={currentQuestion > questions.length - 1}>
					<ArrowForwardIos  />
				</IconButton>
			</Stack>
			<Question  info={questionInfo}/>
		</>
	)
}