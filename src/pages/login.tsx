import AuthLayout from '@/components/layouts/AuthLayout';
import {
	Alert,
	Box,
	Button,
	Divider,
	TextField,
	Typography,
} from '@mui/material';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Login = () => {
	// Hooks
	const router = useRouter();
	const { status } = useSession();

	// States
	const [userData, setUserData] = useState({
		username: '',
		password: '',
	});
	const [errorText, setErrorText] = useState<string | null>(null);

	// If there is already a user logged in, navigate to the app
	if (status === 'authenticated') {
		router.push('/');
	}

	const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
		e.preventDefault();
		// Reset error text
		setErrorText(null);

		// Validate the credentials, use next-auth to create session
		const result = await signIn('credentials', {
			username: userData.username,
			password: userData.password,
			redirect: false,
		});

		// Check whether login was successful
		if (result?.ok) {
			// TODO: Low Priority - push to callback url
			router.push('/');
		} else {
			return setErrorText('Username/Password incorrect.');
		}
	};

	return (
		<>
			<AuthLayout>
				<Typography variant="h3">Login to your account</Typography>
				<Divider sx={{ my: 2 }} />
				<Box
					component="form"
					sx={{
						display: 'flex',
						gap: 2,
						flexDirection: 'column',
					}}
					onSubmit={handleSubmit}
				>
					{errorText && <Alert severity="error">{errorText}</Alert>}
					<TextField
						variant="outlined"
						fullWidth
						label="Username"
						value={userData.username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (errorText) setErrorText(null);
							setUserData({ ...userData, username: e.target.value });
						}}
					/>
					<TextField
						variant="outlined"
						fullWidth
						label="Password"
						type="password"
						value={userData.password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (errorText) setErrorText(null);
							setUserData({ ...userData, password: e.target.value });
						}}
					/>
					<Button type="submit" variant="contained" fullWidth value="Register">
						Login
					</Button>
				</Box>
				<Divider sx={{ my: 2 }} />
				<Button
					variant="contained"
					fullWidth
					color="secondary"
					onClick={() => router.push('/register')}
				>
					Register
				</Button>
			</AuthLayout>
		</>
	);
};

export default Login;
