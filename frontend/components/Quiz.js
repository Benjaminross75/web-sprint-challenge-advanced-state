import React, {useEffect, useState} from 'react';
import { fetchQuiz,setMessage } from '../state/action-creators';
import {connect, useDispatch} from 'react-redux'
import Message from './Message'
function Quiz(props) {
  const {fetchQuiz,quiz,selectedAnswer} = props
  const dispatch = useDispatch();

  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);

  useEffect(()=>{
    //const savedState = JSON.parse(localStorage.getItem('quizState'));
    //if(savedState){
      //dispatch(savedState);

     // setSelected1(savedState.selected1);
     // setSelected2(savedState.selected2);
    //} else if(!quiz){fetchQuiz()}


  },[dispatch, fetchQuiz])

  useEffect(() => {
    const stateToSave = { type: 'SET_SELECTED_ANSWER', payload: selectedAnswer, selected1, selected2 };
    localStorage.setItem('quizState', JSON.stringify(stateToSave));
     dispatch(stateToSave)
     setSelected1(stateToSave.selected1);
      setSelected2(stateToSave.selected2);
     if(!quiz){fetchQuiz()}
  }, [selectedAnswer, selected1, selected2]);
  const isSelectedAnswer = !selectedAnswer
  const initailState = false
  // const [selected1, setSelected1] = useState(initailState)
  // const [selected2, setSelected2] = useState(initailState)

  const clear = () =>{
    setSelected1(initailState)
    setSelected2(initailState)
  }


  const handleSelectedAnswer = (answerId) =>{
    console.log(answerId)
    dispatch({ type: 'SET_SELECTED_ANSWER', payload: answerId });

    if (answerId === quiz.answers[0].answer_id) {
      setSelected1(true);
      setSelected2(false);
    } else if (answerId === quiz.answers[1].answer_id) {
      setSelected1(false);
      setSelected2(true);
     }// else {
    //   setSelected1(false);
    //   setSelected2(false);
    // }

   }

   const handleSubmit = (e) =>{
   e.preventDefault()

    const isCorrect = selectedAnswer === quiz.answers[0].answer_id;
       console.log(`selectedAnswer -->${selectedAnswer} and quiz.answers ---> ${quiz.answers[0].answer_id}`)
    if (isCorrect) {
      dispatch(setMessage('Nice job! That was the correct answer'));
    } else {
      dispatch(setMessage('What a shame! That was the incorrect answer'));
    }
    fetchQuiz()
    clear()
    //setMessage()
   }

  return (
    <div id="wrapper">

      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz  ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
             <div className={selected1 ? "answer selected": "answer"}>
                {quiz.answers[0].text}
                <button onClick={() => handleSelectedAnswer(quiz.answers[0].answer_id)}>
                  {selected1 ? 'SELECTED': 'Select'}
                </button>
              </div>

              <div className={selected2 ? "answer selected": "answer"}>
                {quiz.answers[1].text}
                <button onClick={() => handleSelectedAnswer(quiz.answers[1].answer_id)}>
                {selected2 ? 'SELECTED': 'Select'}
                </button>
              </div>
            </div>

            <button onClick={handleSubmit}id="submitAnswerBtn">Submit answer</button>
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
export default connect(mapStateToProps,{fetchQuiz, setMessage,}) (Quiz)







// import React,{useEffect, useState} from 'react';
// import { fetchQuiz,setMessage } from '../state/action-creators';
// import {connect, useDispatch} from 'react-redux';

//  function Quiz(props) {
//   const {fetchQuiz, quiz, selectedAnswer} = props;




//   useEffect(()=>{

//       fetchQuiz()

//   },[])

//   const dispatch = useDispatch()

//   const initialState = false;
//   const [selected1, setSelected1] = useState(false);//initialState
//  const [selected2, setSelected2] = useState(false);//initialState
//   const [disabled, setDisabled] = useState(true)//true

//   const clear = () =>{
//     setSelected1(initialState);
//     setSelected2(initialState);
//     setDisabled(true)

//   };

//   const enableButton = () =>{
//     setDisabled(false);

//   }

//   const handleSelectedAnswer = (answerId) =>{
//   dispatch({type:'SET_SELECTED_ANSWER', payload: answerId});

//      if(answerId === quiz.answers[0].answer_id){
//       setSelected1(true);
//       setSelected2(false);
//      } else if(answerId === quiz.answers[1].answer_id){
//       setSelected1(false);
//       setSelected2(true)
//      } else{
//       setSelected1(false);
//       setSelected2(false)
//      }
//    enableButton()
//   }

//   const handleSubmit  = () =>{
//    const isRight = selectedAnswer === quiz.answers[0].answer_id;

//    if(isRight){
//     dispatch(setMessage('Nice job! That was the correct answer'))
//    } else {
//     dispatch(setMessage('What a shame! That was the incorrect answer'))
//    }
//    fetchQuiz()
//    clear()
//   }
//   return (
//     <div id="wrapper">
//       {
//         // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
//         quiz ? (
//           <>
//             <h2>{quiz.question}</h2>

//             <div id="quizAnswers">
//               <div className={selected1 ? "answer selected" : "answer"}>
//                 {quiz.answers[0].text}
//                 <button onClick={()=>handleSelectedAnswer(quiz.answers[0].answer_id)}>
//                   {selected1 ? 'SELECTED': 'Select'}
//                 </button>
//               </div>

//               <div className={selected2 ? "answer selected" : "answer"}>
//                 {quiz.answers[1].text}
//                 <button onClick={()=>handleSelectedAnswer(quiz.answers[1].answer_id)}>
//                   {selected2 ? "SELECTED" : "Select"}
//                 </button>
//               </div>
//             </div>

//             <button onClick={handleSubmit}  id="submitAnswerBtn" disabled={disabled}>Submit answer</button>
//           </>
//         ) : 'Loading next quiz...'
//       }
//     </div>
//   )
// }
// const mapStateToProps = state =>{
//   return {
//     quiz: state.quiz,
//     selectedAnswer: state.selectedAnswer,
//     infoMessage: state.infoMessage,
//   }
// }
// export default connect(mapStateToProps,{fetchQuiz, setMessage}) (Quiz)
