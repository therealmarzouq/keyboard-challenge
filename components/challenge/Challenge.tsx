import { recordTest } from 'helpers/recordTest'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRef, setCaretRef, setWordList } from 'store/actions'
import { State } from 'store/reducer'
import { PencilAlt, BookMark } from '@components/icons'
import { Button, TextArea } from '@components/ui'

const Challenge = () => {
  const {
    word: { typedWord, currWord, wordList, typedHistory },
    time: { timer },
  } = useSelector((state: State) => state)
  const dispatch = useDispatch()
  const extraLetters = typedWord.slice(currWord.length).split('')
  const activeWord = useRef<HTMLDivElement>(null)
  const caretRef = useRef<HTMLSpanElement>(null)
  const [editWords, setEditWords] = useState(false)
  const [wordListCombined, setWordListCombined] = useState('')

  useEffect(() => {
    dispatch(setRef(activeWord))
    dispatch(setCaretRef(caretRef))
  }, [dispatch])

  useEffect(() => {
    document.onkeydown = (e) => {
      if (editWords) return
      console.log(e.code, editWords)
      if (
        e.key.length === 1 ||
        e.key === 'Backspace' ||
        e.key === 'Tab' ||
        e.key === ' ' ||
        e.code === 'Space'
      ) {
        recordTest(e.key, e.ctrlKey)
        e.preventDefault()
      }
    }
    return () => {
      document.onkeydown = null
    }
  }, [dispatch, editWords])

  const updateWordList = (e: React.SyntheticEvent<EventTarget>) => {
    let newWordList = wordListCombined

    dispatch(setWordList([newWordList]))
    setEditWords(false)
  }

  return (
    <>
      {!editWords && (
        <>
          <div className="flex text-base justify-between items-center mb-8">
            <h2 className="">
              Duration: <span className="font-semibold text-2xl">{timer}s</span>
            </h2>
            <div className="">
              Total Words:{' '}
              <span className="font-semibold text-2xl">{wordList?.length}</span>
            </div>
          </div>
          <div className="text-2xl leading-9 my-4 font-serif">
            <div className="box flex flex-wrap items-center">
              {wordList.map((word, idx) => {
                const isActive =
                  currWord === word && typedHistory.length === idx
                return (
                  <div
                    key={word + idx}
                    className="word mx-1 mb-0.5"
                    ref={isActive ? activeWord : null}
                  >
                    {isActive ? (
                      <span
                        ref={caretRef}
                        id="caret"
                        className="blink text-yellow-400 absolute ml-[-7.29165px] transition-['left'] animate-pulse"
                        style={{
                          left: typedWord.length * 14.5833,
                        }}
                      >
                        |
                      </span>
                    ) : null}
                    {word.split('').map((char, charId) => {
                      return <span key={char + charId}>{char}</span>
                    })}
                    {isActive
                      ? extraLetters.map((char, charId) => {
                          return (
                            <span key={char + charId} className="wrong extra">
                              {char}
                            </span>
                          )
                        })
                      : typedHistory[idx]
                      ? typedHistory[idx]
                          .slice(wordList[idx].length)
                          .split('')
                          .map((char, charId) => {
                            return (
                              <span key={char + charId} className="wrong extra">
                                {char}
                              </span>
                            )
                          })
                      : null}
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <a
              className="text-gray-500 flex items-center text-sm"
              onClick={() => {
                setWordListCombined(wordList.join(' '))
                setEditWords(true)
              }}
            >
              <PencilAlt /> edit
            </a>
          </div>
        </>
      )}
      {editWords && (
        <div className="">
          <TextArea
            rows={18}
            value={wordListCombined}
            onChange={setWordListCombined}
          ></TextArea>
          <div className="flex justify-end my-3">
            <Button variant="slim" onClick={(e) => updateWordList(e)}>
              <BookMark className="mr-2" /> save
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default Challenge
