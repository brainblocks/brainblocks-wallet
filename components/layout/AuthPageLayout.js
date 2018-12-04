import React from 'react'
import { destyle } from 'destyle'

const AuthPageLayout = ({
  eyebrow,
  title,
  description,
  styles,
  children,
  ...rest
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {!!eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        {!!title && <h1 className={styles.title}>{title}</h1>}
        {!!description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.formContainer}>{children}</div>
    </div>
  )
}

export default destyle(AuthPageLayout, 'AuthPageLayout')
