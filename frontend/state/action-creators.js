// ❗ You don't need to add extra action creators to achieve MVP
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE,SET_SELECTED_ANSWER,SET_INFO_MESSAGE,SET_QUIZ_INTO_STATE, INPUT_CHANGE,RESET_FORM } from "./action-types"
import axios from 'axios';

export function moveClockwise() {
  return({type: MOVE_CLOCKWISE})
 }

export function moveCounterClockwise() {
  return({type: MOVE_COUNTERCLOCKWISE})
 }

export function selectAnswer(answerId) {
  return({type: SET_SELECTED_ANSWER, payload: answerId})
}

export function setMessage(message) {
  return({type: SET_INFO_MESSAGE, payload: message})
}

export function setQuiz(quiz) {
  return({type: SET_QUIZ_INTO_STATE, payload:quiz})
 }

export function inputChange(value) {
  return({type: INPUT_CHANGE, payload: value})
 }

export function resetForm() {
  return({type: RESET_FORM})
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz(null))
    axios.get('http://localhost:9000/api/quiz/next')
    .then(res =>{
      console.log(res.data)
      dispatch(setQuiz(res.data))
    })

  }
}
export function postAnswer(answerData) {
  return function (dispatch) {

    // On successful POST:
     axios.post('http://localhost:9000/api/quiz/answer', answerData)
       .then(res =>{
        dispatch(inputChange(res.data))
        
       })
       .catch(error => {
        console.error('Error posting answer:', error);

      });
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(quizData) {
  return function (dispatch) {


   return axios.post('http://localhost:9000/api/quiz/new', quizData)
    .then(res =>{


      console.log('res postquiz --->', JSON.stringify(res.data, null, 2));
        dispatch(inputChange(res.data))


        dispatch(resetForm())
        return res.data
    })
    .catch(error => {
      console.error('Error posting quiz:', error);
      // Dispatch an action to set an error message in the state if needed
    });
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
