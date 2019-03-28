// @flow
import * as React from 'react'
import { destyle } from 'destyle'

type Props = {
  title: string,
  subtitle: string,
  graphic: string,
  children: React.Node,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object
  /** Used by destyle */
}

const Message = ({
  styles,
  title,
  subtitle,
  graphic,
  children,
  ...rest
}: Props) => {
  return (
    <div className={styles.root} {...rest}>
      <div className={styles.header}>
        {!!title && <h2 className={styles.title}>{title}</h2>}
        {!!subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {!!graphic && (
        <div className={styles.graphic}>
          <img src={graphic} alt={title} />
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default destyle(Message, 'Message')
