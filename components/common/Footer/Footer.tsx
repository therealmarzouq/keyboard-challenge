import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container } from '@components/ui'
import s from './Footer.module.css'

const Footer: FC<any> = ({ className }) => {
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <p className="text-center text-sm">
          Created by
          <Link href="#">
            <a className="font-mono mx-1 my-4">@therealmarzouq</a>
          </Link>
        </p>
      </Container>
    </footer>
  )
}

export default Footer
