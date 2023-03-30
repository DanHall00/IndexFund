import { IFundDoc } from '@/modules/funds/fund.interfaces';
import { createUserFund } from '@/modules/funds/fund.service';
import Close from '@mui/icons-material/Close';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import React, {
	ForwardRefRenderFunction,
	forwardRef,
	useImperativeHandle,
	useState,
} from 'react';
import { useMutation, useQueryClient } from 'react-query';

/**
 * Interface that defines the props in InvestModal
 *
 * @interface InvestModalProps
 */
interface InvestModalProps {}

/**
 * Interface that defines the methods that can be used from a ref of InvestModal
 *
 * @interface InvestModalHandle
 */
interface InvestModalHandle {
	handleOpenModal: (_fund: IFundDoc) => void;
}

/**
 * Component for rendering the investment modal
 *
 * @param {*} props generic react props
 * @param {*} ref forward reference of the component
 * @return {*} Component
 */
const InvestModal: ForwardRefRenderFunction<
	InvestModalHandle,
	InvestModalProps
> = (props, ref) => {
	/*
	 * ----------------------------------------------------------------------------------
	 * HOOKS
	 * ----------------------------------------------------------------------------------
	 */
	const queryClient = useQueryClient();

	/*
	 * ----------------------------------------------------------------------------------
	 * LOCAL STATE
	 * ----------------------------------------------------------------------------------
	 */
	const [open, setOpen] = useState(false);
	const [fund, setFund] = useState<IFundDoc | null>(null);
	const [value, setValue] = useState<number>(100);

	/*
	 * ----------------------------------------------------------------------------------
	 * REACT-QUERY
	 * ----------------------------------------------------------------------------------
	 */
	const createApplication = useMutation({
		mutationFn: createUserFund,
	});

	/*
	 * ----------------------------------------------------------------------------------
	 * HANDLING METHODS
	 * ----------------------------------------------------------------------------------
	 */

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

	/*
	 * ----------------------------------------------------------------------------------
	 * METHOD EXPORT
	 * ----------------------------------------------------------------------------------
	 */

	useImperativeHandle(ref, () => ({
		handleOpenModal,
	}));

	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */

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
