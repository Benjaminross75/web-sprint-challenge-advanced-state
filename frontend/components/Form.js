import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const onChange = evt => {
    const {id, value} = evt.target
    props.inputChange({name:id, value})
  }

  const onSubmit = evt => {
   evt.preventDefault();

   const quizData = {
    question_text: props.newQuestion,
    true_answer_text: props.newTrueAnswer,
    false_answer_text: props.newFalseAnswer,
  };
   props.postQuiz(quizData)
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={props.question_text} onChange={onChange} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={props.true_answer_text} onChange={onChange} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={props.false_answer_text} onChange={onChange} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}



export default connect(st => st, actionCreators)(Form)
