
import { PropsWithChildren, useEffect } from 'react'
import Context from '@/context/Context'
import MobileMenu from '@/Components/Header/MobileMenu'
import BackToTop from '@/Components/BackToTop'
import { Provider } from 'react-redux'
import Store from "@/redux/store";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import HeaderTopBar from '@/Components/Header/HeaderTopBar/HeaderTopBar'
import HeaderStyleNine from '@/Components/Header/HeaderStyle-Nine'
import Marketplace from '@/Components/12-Marketplace/12Marketplace'
import Separator from '@/Components/Common/Separator'
import FooterThree from '@/Components/Footer/Footer-Three'
import Button from '@/Components/Button/Button'
import { Link, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'

export default function Guest({ children }: PropsWithChildren) {
  const { auth } = usePage<PageProps>().props
    return (
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          {/*<HeaderTopBar />*/}
          <HeaderStyleNine/>
          {children}
          <BackToTop />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    );
}
