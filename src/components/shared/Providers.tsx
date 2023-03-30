import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppThemeProvider from './AppThemeProvider';

/**
 * Interface to define props for Providers
 *
 * @interface IProvidersProps
 */
interface IProvidersProps {
	children: React.ReactNode;
}

/**
 * Component to declare all application context providers
 *
 * @param {IProvidersProps} { children }
 * @return {*}
 */
const Providers = ({ children }: IProvidersProps) => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const [queryClient] = useState(() => new QueryClient());

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AppThemeProvider>
					<SessionProvider>{children}</SessionProvider>
				</AppThemeProvider>
			</QueryClientProvider>
		</>
	);
};

export default Providers;
