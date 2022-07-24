import { useRouter } from 'next/router'
import { Button } from '@components/ui'

import { useSelector } from 'react-redux'
import { State } from 'store/reducer'

export default function Result() {
  const router = useRouter()
  const {
    word: { wordList, typedHistory, currWord },
    preferences: { timeLimit },
  } = useSelector((state: State) => state)

  const spaces = wordList.indexOf(currWord)
  let correctChars = 0
  const result = typedHistory.map(
    (typedWord, idx) => typedWord === wordList[idx]
  )
  result.forEach((r, idx) => {
    if (r) correctChars += wordList[idx].length
  })

  const wpm = ((correctChars + spaces) * 60) / timeLimit / 5

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full w-full text-xl mt-36">
      <h1 className="text-4xl font-semibold slashed-zero">
        {Math.round(wpm) + ' wpm'}
      </h1>
      <div className="flex gap-2">
        <p>Correct Words:</p>
        <p className="font-semibold">{result.filter((x) => x).length}</p>
      </div>
      <div className="flex gap-2">
        <p>Incorrect Words:</p>
        <p className="font-semibold">{result.filter((x) => !x).length}</p>
      </div>
      <div className="">
        <Button onClick={() => router.reload()}>Restart</Button>
      </div>
    </div>
  )
}
