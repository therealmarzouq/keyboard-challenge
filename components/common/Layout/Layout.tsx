import s from './Layout.module.css'
import { Footer, Header } from '@components/common'

const Layout: React.FC<any> = ({ children }) => {
  return (
    <div className={s.root}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
