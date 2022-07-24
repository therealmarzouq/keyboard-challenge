import React, { useEffect, useState } from 'react'
import { Input } from '@components/ui'

import { useDispatch, useSelector } from 'react-redux'
import { State } from 'store/reducer'
import { setTime, timerSet } from 'store/actions'

const Duration = () => {
  const [duration, setDuration] = useState(1)
  const {
    time: { timerId, timer },
    word: { currWord, typedWord, activeWordRef },
  } = useSelector((state: State) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    const time = +(duration * 60)
    time && dispatch(timerSet(time))
    time && dispatch(setTime(time))
  }, [dispatch, duration])

  return (
    <div className="flex  items-center gap-4 justify-center">
      <h2 className="font-semibold">Set Duration:</h2>
      <ul className="flex items-center gap-4 flex-wrap">
        <li className="relative">
          <input
            type="radio"
            id="one"
            name="duration"
            value="1"
            className="absolute w-full h-full opacity-0 peer cursor-pointer"
            checked={duration === 1}
            onChange={() => setDuration(1)}
          />
          <label
            htmlFor="html"
            className="peer-checked:font-semibold text-gray-700 peer-checked:bg-gray-300 border border-gray-300 py-1 px-2.5 rounded-xl text-sm"
          >
            1 Min
          </label>
        </li>
        <li className="relative">
          <input
            type="radio"
            id="one"
            name="duration"
            value="2"
            className="absolute w-full h-full opacity-0 peer cursor-pointer"
            checked={duration === 2}
            onChange={() => setDuration(2)}
          />
          <label
            htmlFor="html"
            className="peer-checked:font-semibold text-gray-700 peer-checked:bg-gray-300 border border-gray-300 py-1 px-2.5 rounded-xl text-sm"
          >
            2 Min
          </label>
        </li>
        <li className="relative">
          <input
            type="radio"
            id="one"
            name="duration"
            value="5"
            className="absolute w-full h-full opacity-0 peer cursor-pointer"
            checked={duration === 5}
            onChange={() => setDuration(5)}
          />
          <label
            htmlFor="html"
            className="peer-checked:font-semibold text-gray-700 peer-checked:bg-gray-300 border border-gray-300 py-1 px-2.5 rounded-xl text-sm"
          >
            5 Min
          </label>
        </li>
        <li className="relative">
          <Input
            type="number"
            placeholder="Custom"
            id="custom"
            name="duration"
            className="active:font-semibold active:bg-gray-300 text-gray-700  border border-gray-300 py-1 px-2 rounded-2xl text-sm w-24"
            onChange={setDuration}
          />
        </li>
      </ul>
    </div>
  )
}

export default Duration
