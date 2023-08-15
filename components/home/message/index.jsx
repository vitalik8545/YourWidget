import {useEffect, useState} from "react";

export default function Message({text, messageFinished}){
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 100);

            return () => clearTimeout(timeout);
        }else{
            messageFinished()
        }
    }, [currentIndex, text]);

    return (
        <div className={`rounded-lg bg-[#1b1f23] p-[8px] text-green-500 mb-[8px]`}>
            <p>{currentText}</p>
        </div>
    )
}
