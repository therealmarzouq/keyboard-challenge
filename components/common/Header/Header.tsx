import React from 'react'
import Duration from '@components/duration'

const Header = () => {
  return (
    <header className="flex gap-y-6 justify-center lg:justify-between flex-wrap items-center py-8 px-8">
      <h1 className="text-xl font-semibold select-none">
        Typing
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-black relative inline-block mx-2">
          <span className="italic relative text-white">Challenge</span>
        </span>
      </h1>
      <Duration />
    </header>
  )
}

export default Header
