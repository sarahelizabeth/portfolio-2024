import { useState, useEffect, useContext, createContext } from 'react';
import API from '../api';
import { UserContext } from '../App';
import QuestionForm from '../components/blog/QuestionForm';
import Questions from '../components/Questions';

export const QuestionsContext = createContext(null);

const AMAPage = ({ handleOpenRegister, handleOpenLogin }) => {
  const userContext = useContext(UserContext);
  // replace with useMemo!!!!!!
  const [questions, setQuestions] = useState([]);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const handleSuccess = () => {
    setQuestionSubmitted(!questionSubmitted);
  };

  useEffect(() => {
    API.get(`/api/blog/questions/`)
      .then((response) => {
        const questionData = response.data;
        setQuestions(questionData);
      })
      .catch((error) => {
        console.error('list questions error: ', error);
      });
  }, [questionSubmitted, commentSubmitted]);

  return (
    <>
      <section className='w-screen h-screen grid grid-rows-4 md:grid-cols-2'>
        <div className='w-full h-full md:h-screen row-span-2 centered flex-row md:flex-col sticky top-0 overflow-hidden bg-black text-white'>
          <div className='w-3/4 md:w-2/3'>
            <h1 id='ask' className='knewave text-white text-center'>Ask Me Anything!</h1>
            {userContext.user == null ? (
              <>
                <p className='py-2'>Sign up or log in to ask me a question or leave a comment!</p>
                <div className='flex justify-center gap-6 mt-3'>
                  <button
                    className='button-shadow-white border-2 border-white px-4 py-2 uppercase'
                    onClick={handleOpenRegister}
                  >
                    Sign Up
                  </button>
                  <button
                    className='button-shadow-white border-2 border-white px-4 py-2 uppercase'
                    onClick={handleOpenLogin}
                  >
                    Log In
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className='mt-1 md:mt-5 mb-3 md:px-10 text-justify text-xs'>
                  Enter your query below and you will receive an email notification as soon as I answer it!
                </p>
                <QuestionForm submitQuestion={handleSuccess} />
              </>
            )}
          </div>
        </div>
        <div className='w-full h-full md:h-screen row-span-3 overflow-y-scroll p-8 md:p-20'>
          <QuestionsContext.Provider value={questions}>
            <Questions submitComment={() => setCommentSubmitted(!commentSubmitted)} />
          </QuestionsContext.Provider>
        </div>
      </section>
    </>
  );
};

export default AMAPage;
