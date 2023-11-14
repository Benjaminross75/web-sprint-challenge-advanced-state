import React,{useState, useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import { inputChange, resetForm, postAnswer,postQuiz,setMessage } from '../state/action-creators';
import * as yup from 'yup'

const userSchema = yup.object().shape({
  newQuestion: yup.string().trim().required().min(1),
  newTrueAnswer: yup.string().trim().required().min(1),
  newFalseAnswer: yup.string().trim().required().min(1)
})
export function Form(props) {
  const {form, inputChange,resetForm,postAnswer,postQuiz,setMessage} = props;
  const dispatch = useDispatch()
  const [formEnabled, setFormEnabled] = useState(false);

  useEffect(()=>{
    userSchema.isValid(form).then(isValid => setFormEnabled(isValid))

  },[form])


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
   userSchema.validate(form, { fail: false });

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
   dispatch(setMessage(`Congrats: "${form.newQuestion}" is a great question!`));

  }

  return (
    <form id="form" onSubmit={onSubmit} >
      <h2>Create New Quiz</h2>
      <input value={form.newQuestion} onChange={onChange} maxLength={50}  id="newQuestion"  placeholder="Enter question" />
      <input value={form.newTrueAnswer} onChange={onChange} maxLength={50}  id="newTrueAnswer"  placeholder="Enter true answer" />
      <input value={form.newFalseAnswer} onChange={onChange} maxLength={50}  id="newFalseAnswer"  placeholder="Enter false answer" />
      <button disabled={!formEnabled} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}
  const mapStateToProps = state =>{
    return{
      form: state.form
    }
}



export default connect(mapStateToProps,{inputChange,resetForm,postAnswer,postQuiz,setMessage})(Form)
