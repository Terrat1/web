import './global.css';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base, mainnet, baseSepolia, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { useState, useEffect, useCallback, useRef, ReactNode, ReactElement } from 'react';
import { AppProps } from 'next/app';
import { MotionConfig } from 'framer-motion';
import {
  Provider as CookieManagerProvider,
  Region,
  TrackingCategory,
  TrackingPreference,
} from '@coinbase/cookie-manager';

import { Layout, NavigationType } from '../src/components/Layout/Layout';
import ClientAnalyticsScript from '../src/components/ClientAnalyticsScript/ClientAnalyticsScript';

import { cookieManagerConfig } from '../src/utils/cookieManagerConfig';
import useSprig from 'base-ui/hooks/useSprig';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import { NextPage } from 'next';
import localFont from 'next/dist/compiled/@next/font/dist/local';

const config = getDefaultConfig({
  appName: 'Base.org',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? 'b5814e77db542936040ce71ecd601562',
  chains: [baseSepolia, mainnet],
  ssr: true,
});
const queryClient = new QueryClient();
const sprigEnvironmentId = process.env.NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function StaticApp({ Component, pageProps }: AppPropsWithLayout) {
  // Cookie Manager Provider Configuration
  const [isMounted, setIsMounted] = useState(false);
  const trackingPreference = useRef<TrackingPreference | undefined>();

  const setTrackingPreference = useCallback((newPreference: TrackingPreference) => {
    const priorConsent = trackingPreference.current?.consent;
    trackingPreference.current = newPreference;

    if (!priorConsent) {
      // The first time the modal appears, this function is called with nothing present in
      // trackingPreference.current. To avoid an infinite refresh loop, we return early on
      // the first call.
      return;
    }

    const newConsent = newPreference.consent;

    // Check if the preferences have changed.
    const diff = [
      ...priorConsent.filter((elem: TrackingCategory) => !newConsent.includes(elem)),
      ...newConsent.filter((elem: TrackingCategory) => !priorConsent.includes(elem)),
    ];

    // Reload if the preferences have changed.
    if (diff.length > 0) {
      window.location.reload();
    }
  }, []);

  const handleLogError = useCallback((err: Error) => console.error(err), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useSprig(sprigEnvironmentId);

  const getLayout =
    Component.getLayout ??
    ((page) => <Layout navigationType={NavigationType.Default}>{page}</Layout>);

  if (!isMounted) return null;

  return (
    <CookieManagerProvider
      projectName="base_web"
      locale="en"
      region={Region.DEFAULT}
      log={console.log}
      onError={handleLogError}
      onPreferenceChange={setTrackingPreference}
      config={cookieManagerConfig}
    >
      <MotionConfig reducedMotion="user">
        <ClientAnalyticsScript />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider modalSize="compact" avatar={UserAvatar}>
              {getLayout(<Component {...pageProps} />)}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </MotionConfig>
    </CookieManagerProvider>
  );
}
