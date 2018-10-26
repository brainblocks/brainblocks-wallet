// @flow
import * as React from 'react'
import { destyle } from 'destyle'
import Button from '../button/Button'

type Props = {
	/** Address to format */
	address: string,
	/** Show copy button */
	copyable?: boolean,
	/** Number of characters before ellipsis */
	startChars: number,
	/** Number of characters after ellipsis */
	endChars: number,
	/** Given by destyle. Do not pass this to the component as a prop. */
	styles: Object
}

/**
 * NanoAddress.
 * @todo Copy button
 */
export const NanoAddress = ({
	styles,
	address,
	startChars = 10,
	endChars = 5,
	copyable = false,
	...rest
}: Props) => {
	const start = address.substr(0, startChars)
	const end = address.substr(address.length - endChars)
	return (
		<span className={styles.root}>
			<span className={styles.address}>
				<span className={styles.start}>{start}</span>
				<span className={styles.ellipsis}>&hellip;</span>
				<span className={styles.end}>{end}</span>
			</span>
			<Button type="secondary" style={{ fontSize: 14 }}>
				Copy
			</Button>
		</span>
	)
}

export default destyle(NanoAddress, 'BB-NanoAddress')
