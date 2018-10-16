import { css } from 'emotion'
import { addStyles } from 'destyle'
import theme from '../theme'

const styles = addStyles('BB-Select', {
  root: css`
    border: none;
    background-color: transparent;
    font-size: 15px;
    font-weight: 700;
    padding: 1.5em 2.75em 1.5em 1.75em;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAICAYAAADJEc7MAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB4SURBVHgBhc7hDQARDAVgJfawipFM4o99jHL2EJx3uUsaGtdEwms/KaWULjWr1upDCEUdKsborLUZd917V2OMJ0DjD2EWRrfW/HyUE+YIszD0NYwxmYjcPIWvLSH0iP+6YuQSQk7rShwjk9AGV/zCDYmQY9wlhLoBM2OFpG7EnQMAAAAASUVORK5CYII=');
    background-position: right 1.25em center;
  `
})
