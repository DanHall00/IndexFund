import Providers from '@/components/shared/Providers';
import type { AppProps } from 'next/app';
import { Hydrate } from 'react-query';

/**
 * NextJS App Component
 *
 * @param {AppProps} { Component, pageProps }
 * @return {*}
 */
const App = ({ Component, pageProps }: AppProps) => {
	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<Providers>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
		</Providers>
	);
};

export default App;
