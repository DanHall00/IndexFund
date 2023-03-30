import { Grid } from '@mui/material';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

/*
 * ----------------------------------------------------------------------------------
 * REGISTER CHART COMPONENTS
 * ----------------------------------------------------------------------------------
 */

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

/**
 * Interface to define props for VoteChart
 *
 * @interface IVoteChartProps
 */
interface IVoteChartProps {
	For: number;
	Against: number;
	Abstain: number;
	NoVote: number;
}

/**
 * Component to render a chart based on number of votes
 *
 * @param {IVoteChartProps} { For, Against, Abstain, NoVote }
 * @return {*}
 */
const VoteChart = ({ For, Against, Abstain, NoVote }: IVoteChartProps) => {
	// TODO: Low Priority - Move vote counting logic into this component
	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
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
