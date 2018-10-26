import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

addStyles('BB-NanoAddress', {
	root: css`
		display: flex;
		flex-wrap: wrap;
	`,
	address: css`
		flex-grow: 1;
	`
})
