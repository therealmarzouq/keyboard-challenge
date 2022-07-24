import { setTimerId, setWordList, timerSet } from 'store/actions'
import { store } from 'store/store'
import { faker } from '@faker-js/faker'

export const resetTest = async () => {
  const { dispatch, getState } = store
  const {
    time: { timerId },
    preferences: { timeLimit, type },
  } = getState()
  document
    .querySelectorAll('.wrong, .right')
    .forEach((el) => el.classList.remove('wrong', 'right'))
  if (timerId) {
    clearInterval(timerId)
    dispatch(setTimerId(null))
  }
  const randomWords = faker.lorem.sentence(95)
  dispatch(setWordList([randomWords]))
  dispatch(timerSet(timeLimit))
}
