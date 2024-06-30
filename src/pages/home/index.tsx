import { Helmet } from 'react-helmet'
import Main from '@/components/home/main'
import { SiteHeader } from '@/components/layout/header'

export default function Home() {
  return (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <title>{'You bet'}</title>
      </Helmet>
      <Main />
    </>
  )
}
