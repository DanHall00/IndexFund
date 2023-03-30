import { IFundDoc } from '@/modules/funds/fund.interfaces';
import { createUserFund } from '@/modules/funds/fund.service';
import Close from '@mui/icons-material/Close';
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	ListItemText,
	MenuItem,
	Modal,
	OutlinedInput,
	Select,
	TextField,
} from '@mui/material';
import React, {
	ForwardRefRenderFunction,
	forwardRef,
	useImperativeHandle,
	useState,
} from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

type InvestModalProps = {};

type InvestModalHandle = {
	handleOpenModal: (_fund: IFundDoc) => void;
};

const InvestModal: ForwardRefRenderFunction<
	InvestModalHandle,
	InvestModalProps
> = (props, ref) => {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);

	const [fund, setFund] = useState<IFundDoc | null>(null);
	const [value, setValue] = useState<number>(100);

	const createApplication = useMutation({
		mutationFn: createUserFund,
	});

	const handleOpenModal = (_fund: IFundDoc) => {
		setFund(_fund);
		setValue(100);
		setOpen(true);
	};

	const handleCloseModal = () => {
		setFund(null);
		setValue(100);
		setOpen(false);
	};

	const handleSubmitForm = async (e: React.FormEvent<HTMLDivElement>) => {
		e.preventDefault();
		try {
			const response = await createApplication.mutateAsync({
				fund: fund?.id,
				initialValue: value,
				value,
			});
			if (response.message) {
				return;
			}
			handleCloseModal();
			queryClient.invalidateQueries(['investments']);
			queryClient.invalidateQueries(['userFunds']);
			queryClient.invalidateQueries(['funds', fund?.id]);
		} catch (err) {
			console.log(err);
		}
	};

	useImperativeHandle(ref, () => ({
		handleOpenModal,
	}));

	return (
		<Dialog onClose={handleCloseModal} open={open} fullWidth maxWidth="xs">
			<IconButton
				aria-label="close"
				onClick={handleCloseModal}
				sx={{
					position: 'absolute',
					right: 8,
					top: 8,
					color: (theme) => theme.palette.grey[500],
				}}
			>
				<Close />
			</IconButton>
			<DialogTitle>Invest In {fund?.name}</DialogTitle>
			<DialogContent>
				<Box
					component="form"
					id="investInFund"
					onSubmit={handleSubmitForm}
					sx={{ pt: 1 }}
				>
					<TextField
						type="number"
						label="Value"
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">£</InputAdornment>
							),
						}}
						value={value}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (parseInt(e.target.value) < 100) {
								setValue(100);
							} else {
								setValue(parseInt(e.target.value));
							}
						}}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseModal}>Cancel</Button>
				<Button type="submit" form="investInFund">
					Invest
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default forwardRef(InvestModal);
