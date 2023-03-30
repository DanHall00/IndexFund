import { Head, Html, Main, NextScript } from 'next/document';

/**
 * NextJS Document Component
 *
 * @return {*}
 */
const Document = () => {
	/*
	 * ----------------------------------------------------------------------------------
	 * RENDER COMPONENT
	 * ----------------------------------------------------------------------------------
	 */
	return (
		<Html lang="en">
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
