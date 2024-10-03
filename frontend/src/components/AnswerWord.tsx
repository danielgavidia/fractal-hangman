import type { AnswerWord, AnswerLetterObj } from "../../../backend/engine/engineTypes"

interface AnswerWordProps {
    answerWord: AnswerWord
}

interface AnswerLetterProps {
    answerLetterObj: AnswerLetterObj
}

const AnswerLetter: React.FC<AnswerLetterProps> = ({ answerLetterObj }) => {
    const { letter, shown } = answerLetterObj
    return (
        <div className="flex w-full justify-center">
            {shown ? (
                <div className="w-full text-center h-10 flex items-center justify-center">
                    <p className="border-b-2 border-neutral w-1/2">{letter}</p>
                </div>
            ) : (
                <div className="w-full text-center h-10 flex items-center justify-center">
                    <p className="border-b-2 border-neutral w-1/2 text-neutral-content">x</p>
                </div>
            )}
        </div>
    );
};

const AnswerWord: React.FC<AnswerWordProps> = ({ answerWord }) => {
    return (
        <div className="flex justify-between my-4">
            {answerWord.map((x, index) => {
                return <AnswerLetter key={index} answerLetterObj={x} />;
            })}
        </div>
    )
}

export default AnswerWord