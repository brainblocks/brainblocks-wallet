Grid example:

```js
// This import format is required for styleguidist
// Usually it would be import GridItem from '~/bb-components/grid/GridItem'
const GridItem = require('./GridItem').default
const style = { background: 'lightblue' }
;<Grid>
  <GridItem style={style}>1</GridItem>
  <GridItem style={style} span={6}>
    1
  </GridItem>
  <GridItem style={style} span={6}>
    2
  </GridItem>
  <GridItem
    style={style}
    span={12}
    spanMobile={8}
    spanSm={6}
    spanTablet={4}
    spanDesktop={3}
  >
    3
  </GridItem>
  <GridItem
    style={style}
    span={12}
    spanMobile={4}
    spanSm={6}
    spanTablet={4}
    spanDesktop={3}
  >
    4
  </GridItem>
  <GridItem
    style={style}
    span={12}
    spanMobile={8}
    spanSm={6}
    spanTablet={4}
    spanDesktop={3}
  >
    5
  </GridItem>
  <GridItem
    style={style}
    span={12}
    spanMobile={4}
    spanSm={6}
    spanTablet={12}
    spanDesktop={3}
  >
    6
  </GridItem>
</Grid>
```
