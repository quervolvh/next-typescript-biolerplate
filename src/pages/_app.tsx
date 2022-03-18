import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { HtmlHead, RouteChange } from 'components';
import { resizer } from 'utils';
import 'assets/styles/main.scss';
import { ToastHolder } from 'components/toast/ToastHolder';
import { useSessionTimeout } from 'hooks/useSessionTimeout';
import { TimeOutBox } from 'common/session/TimeOutBox';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { auth } = store.getState();

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [deviceWidth, setDeviceWidth] = useState(0);
  const [showMobileView, setShowMobileView] = useState(false);
  const [timeOutTrigger, setTimeOutTrigger] = useState(0);

  const isInSession = auth && auth.expiresAt && (new Date(auth.expiresAt).getTime() > new Date().getTime());
  const currentPath = router.pathname.trim();

  const unProtectedRoutes = [
    "/", "/api", "/customers","/dashboard", "/customers/[slug]" , "/documents",  "/documents/[slug]", "/audit"
  ];

  useSessionTimeout(isInSession, () => setTimeOutTrigger(1));

  const devMode = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

  const redirectCondition =
    (isInSession && [...unProtectedRoutes].includes(currentPath)) ||
    (!auth.expiresAt && ![...unProtectedRoutes].includes(currentPath)) ||
    (auth.expiresAt && !isInSession && unProtectedRoutes.includes(currentPath));

  useEffect(() => {
    if (process.browser && window && document) {
      window.addEventListener("resize", () => resizer(setIsMobile, setDeviceWidth), false);
      setIsMobile(document?.body?.clientWidth < 601);
      setDeviceWidth(document?.body?.clientWidth);
    }
    return (() => {
      if (process.browser && window) {
        window.removeEventListener("resize", () => resizer(setIsMobile, setDeviceWidth), false);
      }
    })
    //eslint-disable-next-line
  }, [process.browser]);

  useEffect(() => {
    setShowMobileView(isMobile);
  }, [isMobile]);

  useEffect(() => {

    if (auth.expiresAt && !isInSession) {

      if (devMode) {

        router.replace("/dashboard");

      } else if (!devMode) {

        store.dispatch({ type: "RESET_APP" });

      }
    }

    if (!auth.expiresAt && ![...unProtectedRoutes].includes(currentPath)) {
      router.replace("/");
    }

    if (isInSession && [...unProtectedRoutes, "/404", "/500"].includes(currentPath)) {
      router.replace("/dashboard");
    }

    //eslint-disable-next-line
  }, [redirectCondition]);

  useEffect(() => {

    if (!isInSession) setTimeOutTrigger(0);

  }, [isInSession]);

  return (
    <Provider store={store}>
      {
        redirectCondition ?

          <HtmlHead
            title={"Stellas"}
          />

          :
          <>
            <ToastHolder />
            <TimeOutBox
              trigger={timeOutTrigger}
            />
            <RouteChange />
            <Component
              {...pageProps}
              isMobile={showMobileView}
              deviceWidth={deviceWidth}
            />
          </>
      }
    </Provider>
  );

}

export default App;
