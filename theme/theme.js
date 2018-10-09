const color = {
  gray: {
    lightest: '#f8f8f9',
    light: '#e1e1e1',
    mid: '#898989',
    dark: '#515151',
    darkest: '#000'
  },
  palette: {
    lightPurple: '#cca0ff',
    lightGreen: '#7dce23',
    lightBlue: '#71cff4',
    brightLightBlue: '#43b7e2',
    darkBlue: '#0a204c',
    green: '#4fb54b',
    blue: '#2892ce',
    teal: '#4ab5a0',
    darkTeal: '#36899e',
    vividBlue: '#194fff'
  }
}

const theme = {
  color: {
    ...color,
    primary: color.palette.lightGreen,
    secondary: '',
    text: {
      base: color.gray.dark,
      light: color.gray.mid,
      headings: color.gray.darkest
    },
    borders: {
      hr: color.gray.light,
      field: color.gray.mid
    },
    status: {
      error: '#c91c1c',
      warning: '',
      info: '',
      success: '#5fb061'
    },
    links: {
      link: '#9e65e0',
      hover: color.palette.vividBlue
    }
  },
  type: {
    baseFontFamily: 'Montserrat, sans-serif',
    baseFontWeight: 400,
    baseLineHeight: 1.4,
    baseFontSize: 14,
    headingFontFamily: '"Maven Pro", sans-serif',
    headingFontWeight: 700,
    headingLineHeight: 1.125,
    monoFontFamily: '"Source Code Pro", monospace',
    monoFontWeight: 500
  },
  spacing: {
    mobile: {},
    tablet: {},
    desktop: {}
  },
  layout: {
    pageWidth: 1110
  },
  bp: {
    mobile: 480,
    sm: 640,
    tablet: 768,
    desktop: 1040,
    large: 1120
  },
  buttons: {
    borderRadius: 14
  }
}

export default theme
