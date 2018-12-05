import React from 'react'
import { destyle } from 'destyle'
import RoundedHexagon from '~/static/svg/rounded-hexagon.svg'
import RoundedHexagonPurple from '~/static/svg/rounded-hexagon-purple.svg'
import TabsComponents from '~/bb-components/tabs/Tabs'
import SwitchTabs from '~/bb-components/switch-tabs/SwitchTabs'

const { Tab, TabList, TabPanel } = TabsComponents

const tabIndexMap = {
  login: 0,
  register: 1
}

type Props = {
  router: Object,
  eyebrow?: string,
  title?: string,
  description?: string,
  /** Given by destyle. Do not pass this to the component as a prop. */
  styles: Object,
  children: React.Node
}

type State = {
  activeTab: number
}

class AuthPageLayout extends React.Component<Props, State> {
  state = {
    activeTab: tabIndexMap[this.props.router.query.tab] || 0
  }

  handleSwitchTabs = (index: number, lastIndex: number, event: Event) => {
    this.setState({
      activeTab: index
    })
  }

  render() {
    const {
      eyebrow,
      title,
      description,
      styles,
      children,
      ...rest
    } = this.props
    const { activeTab } = this.state

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
          <div className={styles.formContainerInner}>
            <SwitchTabs
              selectedIndex={activeTab}
              onSelect={this.handleSwitchTabs}
            >
              <TabList>
                <Tab>Login</Tab>
                <Tab>Register</Tab>
              </TabList>

              <div className={styles.tabPanels}>
                <TabPanel>{children}</TabPanel>
                <TabPanel>Register</TabPanel>
              </div>
            </SwitchTabs>
          </div>
        </div>
      </div>
    )
  }
}

export default destyle(AuthPageLayout, 'AuthPageLayout')
