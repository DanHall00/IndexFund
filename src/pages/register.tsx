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

const Register = () => {
	// Hooks
	const router = useRouter();
	const { status } = useSession();

	// States
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
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

		// Check that the confirm password matches
		if (userData.password !== userData.confirmPassword) {
			return setErrorText('Passwords did not match.');
		}

		// Create user account
		const registerRequest = await fetch('/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				username: userData.username,
				email: userData.email,
				password: userData.password,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// Get response as json
		const registerResponse = await registerRequest.json();

		// Handle process based on response
		switch (registerRequest.status) {
			case 400:
				return setErrorText(registerResponse.message);
			case 200:
				// Login to application
				await signIn('credentials', {
					username: userData.username,
					password: userData.password,
				});
				// Navigate to app
				router.push('/');
				break;
			default:
				return setErrorText('Could not create account at this time.');
		}
	};

	return (
		<>
			<AuthLayout>
				<Typography variant="h3">Register for an account</Typography>
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
							setUserData({ ...userData, username: e.target.value });
						}}
					/>
					<TextField
						variant="outlined"
						fullWidth
						label="Email"
						type="email"
						value={userData.email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setUserData({ ...userData, email: e.target.value });
						}}
					/>
					<TextField
						variant="outlined"
						fullWidth
						label="Password"
						type="password"
						value={userData.password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setUserData({ ...userData, password: e.target.value });
						}}
					/>
					<TextField
						variant="outlined"
						fullWidth
						label="Confirm Password"
						type="password"
						value={userData.confirmPassword}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setUserData({ ...userData, confirmPassword: e.target.value });
						}}
					/>
					<Button type="submit" variant="contained" fullWidth value="Register">
						Register
					</Button>
				</Box>
				<Divider sx={{ my: 2 }} />
				<Button
					variant="contained"
					fullWidth
					color="secondary"
					onClick={() => router.push('/login')}
				>
					Already have an account? Login
				</Button>
			</AuthLayout>
		</>
	);
};

export default Register;
