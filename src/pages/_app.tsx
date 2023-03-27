import Providers from '@/components/shared/Providers';
import type { AppProps } from 'next/app';
import { Hydrate } from 'react-query';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />
			</Hydrate>
		</Providers>
	);
}
