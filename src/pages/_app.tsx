import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { HtmlHead, RouteChange } from 'components';
import { change, resizer } from 'utils';
import 'assets/styles/main.scss';
import { ToastHolder } from 'components/toast/ToastHolder';
import { SetClientAvailability } from 'hooks/useIsClient';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { auth } = store.getState();

  const [state, setState] = useState({
    isMobile: false,
    deviceWidth: 0,
    showMobileView: false,
    timeOutTrigger: 0,
    clientMode: false
  });

  const { isMobile, deviceWidth, showMobileView, clientMode } = state;

  const isInSession = auth && auth.expiresAt && (new Date(auth.expiresAt).getTime() > new Date().getTime());

  const currentPath = router.pathname.trim();

  const unProtectedRoutes: string[] = ["", "/"];

  const redirectCondition =
    (isInSession && [...unProtectedRoutes].includes(currentPath)) ||
    (!auth.expiresAt && ![...unProtectedRoutes].includes(currentPath)) ||
    (auth.expiresAt && !isInSession && unProtectedRoutes.includes(currentPath));

  const resizeListener = (mode: "add" | "remove") => {

    window?.[mode === "add" ? "addEventListener" : "removeEventListener"]?.("resize",

      () => resizer(

        (e) => change(e, "isMobile", setState),
        (e) => change(e, "deviceWidth", setState)

      ),

      false

    );

  }

  useEffect(() => {

    // On first load, this function sets the values obtained for client width and height.

    if (clientMode && window && document) {

      resizeListener("add");

      change(document?.body?.clientWidth < 601, "isMobile", setState);

      change(document?.body?.clientWidth, "deviceWidth", setState);

    }

    return (() => {

      if (clientMode && window) { resizeListener("remove"); }

    })

    //eslint-disable-next-line
  }, [clientMode]);

  useEffect(() => {
    change(isMobile, "showMobileView", setState);
  }, [isMobile]);

  useEffect(() => {

    if (auth.expiresAt && !isInSession) store.dispatch({ type: "RESET_APP" });

    if (!auth.expiresAt && ![...unProtectedRoutes].includes(currentPath)) {
      router.replace("/");
    }

    if (isInSession && [...unProtectedRoutes, "/404", "/500"].includes(currentPath)) {
      router.replace("/dashboard");
    }

    //eslint-disable-next-line
  }, [redirectCondition]);

  useEffect(() => {

    if (!isInSession) change(0, "timeOutTrigger", setState);

  }, [isInSession]);

  SetClientAvailability((e) => change(e, "clientMode", setState));

  return (
    <Provider store={store}>
      
      {
        (redirectCondition || !clientMode) ?

          <HtmlHead
            title={"Stellas"}
          />

          :
          <>
            <ToastHolder />

            <RouteChange />

            <Component
              {...pageProps}
              isMobile={showMobileView}
              deviceWidth={deviceWidth}
              clientMode={clientMode}
            />

          </>
      }
      
    </Provider>
  );

}

export default App;
