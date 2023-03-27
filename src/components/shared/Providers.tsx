import { SessionProvider, useSession } from 'next-auth/react';
import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import AppThemeProvider from './AppThemeProvider';

interface IProvidersProps {
	children: React.ReactNode;
}

const Providers = ({ children }: IProvidersProps) => {
	const [queryClient] = useState(() => new QueryClient());
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
