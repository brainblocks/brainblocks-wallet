import { addStyles } from 'destyle'
import { css } from 'emotion'
import theme from '../theme'

addStyles('BB-Example', props => ({
	root: css`
		background: #eee;
		${props.type === 'primary' &&
			css`
				background: blue;
				color: #fff;
			`};
	`
}))
