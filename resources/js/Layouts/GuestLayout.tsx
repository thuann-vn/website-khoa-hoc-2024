
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

export default function Guest({ children }: PropsWithChildren) {
    return (
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <HeaderTopBar />
          <HeaderStyleNine/>
          <Marketplace />
          <BackToTop />
          <Separator />
          <FooterThree />
        </Context>
      </Provider>
    );
}
