import React from 'react'
import { connect } from 'react-redux'
import { inputChange, resetForm, postAnswer,postQuiz } from '../state/action-creators';

export function Form(props) {
  const {form, inputChange,resetForm,postAnswer,postQuiz} = props;
  const onChange = evt => {

    const {id, value} = evt.target
    inputChange({name:id, value})


  }

  const onSubmit = async evt => {
   evt.preventDefault();


   const quizData = {
    question_text: form.newQuestion,
    true_answer_text: form.newTrueAnswer,
    false_answer_text: form.newFalseAnswer,
  };

  const quizResponse = await postQuiz(quizData)
  //console.log('quizResponseeeee --->', JSON.stringify(quizResponse, null, 2));
  const quizId = quizResponse.quiz_id;

  const answerId = quizResponse.answers[0].answer_id;

  const answerData = {
    quiz_id: quizId,
    answer_id: answerId
  }






  postAnswer(answerData)



   postQuiz(quizData)

  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input value={form.newQuestion} onChange={onChange} maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input value={form.newTrueAnswer} onChange={onChange} maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input value={form.newFalseAnswer} onChange={onChange} maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}
  const mapStateToProps = state =>{
    return{
      form: state.form
    }
}



export default connect(mapStateToProps,{inputChange,resetForm,postAnswer,postQuiz})(Form)
