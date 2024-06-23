import { Helmet } from 'react-helmet'
import Main from '@/components/home/home'

export default function Home() {
  return (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <title>{'You bet'}</title>
      </Helmet>
      <Main></Main>
    </>
  )
}
