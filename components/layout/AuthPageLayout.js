import React from 'react'
import { destyle } from 'destyle'
import RoundedHexagon from '~/static/svg/rounded-hexagon.svg'
import RoundedHexagonPurple from '~/static/svg/rounded-hexagon-purple.svg'

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
      <div className={styles.formContainer}>
        <div className={styles.visuals}>
          <span className={styles.hex1}>
            <RoundedHexagon />
          </span>
          <span className={styles.hex2}>
            <RoundedHexagonPurple />
          </span>
          <div className={styles.circle1} />
          <div className={styles.circle2} />
        </div>
        <div className={styles.formContainerInner}>{children}</div>
      </div>
    </div>
  )
}

export default destyle(AuthPageLayout, 'AuthPageLayout')
