import { Layout } from '@components/common'
import Challenge from '@components/challenge'
import { faker } from '@faker-js/faker'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'store/reducer'
import { setTimerId } from 'store/actions'

import { setWordList } from 'store/actions'
import Results from '@components/results'

export default function Home() {
  const {
    time: { timerId, timer },
    word: { currWord, typedWord, activeWordRef },
  } = useSelector((state: State) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    let idx = typedWord.length - 1
    const currWordEl = activeWordRef?.current!
    if (currWordEl) {
      currWordEl.children[idx + 1].classList.add(
        currWord[idx] !== typedWord[idx] ? 'wrong' : 'right'
      )
    }
  }, [currWord, typedWord, activeWordRef])

  useEffect(() => {
    let idx = typedWord.length
    const currWordEl = activeWordRef?.current!
    if (currWordEl && idx < currWord.length)
      currWordEl.children[idx + 1].classList.remove('wrong', 'right')
  }, [currWord.length, typedWord, activeWordRef])

  useEffect(() => {
    if (!timer && timerId) {
      clearInterval(timerId)
      dispatch(setTimerId(null))
    }
  }, [dispatch, timer, timerId])

  useEffect(() => {
    const randomWords = faker.lorem.sentence(95)
    dispatch(setWordList([randomWords]))
  }, [dispatch])

  return (
    <div className="w-full h-full my-14">
      {timer ? <Challenge /> : <Results />}
    </div>
  )
}

Home.Layout = Layout
