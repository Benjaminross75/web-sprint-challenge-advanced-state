import React,{useState, useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import { inputChange, resetForm, postAnswer,postQuiz,setMessage } from '../state/action-creators';
import * as yup from 'yup'

const userSchema = yup.object().shape({
  newQuestion: yup.string().trim().min(1).max(50),
  newTrueAnswer: yup.string().trim().min(1).max(50),
  newFalseAnswer: yup.string().trim().min(1).max(50)
})
export function Form(props) {
  const {form, inputChange,resetForm,postAnswer,postQuiz,setMessage} = props;
  const dispatch = useDispatch();
  //const [formEnabled, setFormEnabled] = useState(false);






  // useEffect(() => {
  //   userSchema.isValid(form).then(setFormEnabled);
  // }, [form]);



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

  const answerId =quizResponse.answers[0].answer_id;

  const answerData = {
    quiz_id: quizId,
    answer_id: answerId
  }






  postAnswer(answerData)


    dispatch(setMessage(`Congrats: "${form.newQuestion}" is a great question!`));

  }
  const submitDisabled = () =>{
    if(form.newQuestion.trim() === '' || form.newTrueAnswer.trim() === '' || form.newFalseAnswer.trim() === ''){
      return true
    }
  }
  
  return (
    <form id="form" onSubmit={onSubmit} >
      <h2>Create New Quiz</h2>
      <input value={form.newQuestion} onChange={onChange} maxLength={50}  id="newQuestion"  placeholder="Enter question" />
     <input value={form.newTrueAnswer} onChange={onChange} maxLength={50}  id="newTrueAnswer"  placeholder="Enter true answer" />
      <input value={form.newFalseAnswer} onChange={onChange} maxLength={50}  id="newFalseAnswer"  placeholder="Enter false answer" />
      <button disabled={submitDisabled()} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}
  const mapStateToProps = state =>{
    return{
      form: state.form
    }
}



export default connect(mapStateToProps,{inputChange,resetForm,postAnswer,postQuiz,setMessage})(Form)



//<button id="submitNewQuizBtn">Submit new quiz</button>


{/* <button disabled={!form.isValid || form.loading} id="submitNewQuizBtn">
        {form.loading ? 'Submitting...' : 'Submit new quiz'}
      </button> */}
