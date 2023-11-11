import React,{useEffect, useState} from 'react';
import { fetchQuiz,setMessage } from '../state/action-creators';
import {connect, useDispatch} from 'react-redux';

 function Quiz(props) {
  const {fetchQuiz, quiz, selectedAnswer} = props;

  useEffect(()=>{
    fetchQuiz()
  },[])

  const dispatch = useDispatch()

  const initialState = false;
  const [selected1, setSelected1] = useState(initialState);
  const [selected2, setSelected2] = useState(initialState);

  const clear = () =>{
    setSelected1(initialState);
    setSelected2(initialState)
  };

  const handleSelectedAnswer = (answerId) =>{
  dispatch({type:'SET_SELECTED_ANSWER', payload: answerId});

     if(answerId === quiz.answers[0].answer_id){
      setSelected1(true);
      setSelected2(false);
     } else if(answerId === quiz.answers[1].answer_id){
      setSelected1(false);
      setSelected2(true)
     } else{
      setSelected1(false);
      setSelected2(false)
     }
  }

  const handleSubmit  = () =>{
   const isRight = selectedAnswer === quiz.answers[0].answer_id;

   if(isRight){
    dispatch(setMessage('Nice job! That was the correct answer'))
   } else {
    dispatch(setMessage('What a shame! That was the incorrect answer'))
   }
   fetchQuiz()
   clear()
  }
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={selected1 ? "answer selected" : "answer"}>
                {quiz.answers[0].text}
                <button onClick={()=>handleSelectedAnswer(quiz.answers[0].answer_id)}>
                  {selected1 ? 'SELECTED': 'Select'}
                </button>
              </div>

              <div className={selected2 ? "answer selected" : "answer"}>
                {quiz.answers[1].text}
                <button onClick={()=>handleSelectedAnswer(quiz.answers[1].answer_id)}>
                  {selected2 ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button onClick={handleSubmit} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapStateToProps = state =>{
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    infoMessage: state.infoMessage,
  }
}
export default connect(mapStateToProps,{fetchQuiz, setMessage}) (Quiz)
