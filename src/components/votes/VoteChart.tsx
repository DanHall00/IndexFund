import {
	Box,
	Button,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Table,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface IVoteChartProps {
	For: number;
	Against: number;
	Abstain: number;
	NoVote: number;
}

const VoteChart = ({ For, Against, Abstain, NoVote }: IVoteChartProps) => {
	return (
		<Grid container justifyContent="center" sx={{ mt: 3 }}>
			<Grid item xs={12} lg={6}>
				<Bar
					options={{
						responsive: true,
						plugins: {
							title: {
								display: true,
								text: 'Vote Results',
								font: {
									size: 20,
									family: "'Cabin', sans-serif",
								},
							},
							legend: {
								display: false,
							},
						},
					}}
					data={{
						labels: ['For', 'Against', 'Abstain', 'No Vote'],
						datasets: [
							{
								data: [For, Against, Abstain, NoVote],
								backgroundColor: '#af4c2a',
							},
						],
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default VoteChart;
