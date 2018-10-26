// @flow
import * as React from 'react'

import Modal from '@material-ui/core/Modal'
import { destyle } from 'destyle'

type Props = {
	/** Popup contents */
	children?: React.Node,
	/** Given by destyle. Do not pass this to the component as a prop. */
	styles: Object
}

/**
 * Popup.
 */
export const Popup = ({ styles, children, ...rest }: Props) => {
	return (
		<Modal {...rest}>
			<div className={styles.root} style={{ background: 'white' }}>
				{children}
			</div>
		</Modal>
	)
}

export default destyle(Popup, 'BB-Popup')
