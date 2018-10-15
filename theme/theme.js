const color = {
  gray: {
    lightest: '#F7F7F7',
    light: '#e1e1e1',
    midLight: '#CCCCCC',
    mid: '#898989',
    dark: '#515151',
    darkest: '#000'
  },
  palette: {
    purple: '#A29BFE',
    gold: '#FDCB6E',
    darkBlue: '#1A2D58',
    green: '#60B061',
    blue: '#4A90E2',
    lightBlue: '#74B4FF',
    teal: '#36899E',
    pink: '#E84493',
    aqua: '#00CEC9',
    orange: '#E17055',
    red: '#CA4040'
  }
}

const theme = {
  color: {
    ...color,
    primary: color.palette.lightBlue,
    secondary: '',
    text: {
      base: color.gray.dark,
      light: '#AAAAAA',
      headings: color.gray.darkest,
      disabled: '#D3D3D3'
    },
    borders: {
      sep: '#ededed'
    },
    status: {
      error: '#E44545',
      errorLight: '#FFD2D2',
      warning: '#EBB756',
      warningLight: '#FBE6BE',
      info: '#4090CA',
      infoLight: '#C9E5F9',
      success: '#60B061',
      successLight: '#C9F9CE'
    },
    links: {
      link: color.palette.lightBlue,
      hover: color.palette.blue
    }
  },
  type: {
    baseFontFamily: 'Montserrat, sans-serif',
    baseFontWeight: 600,
    baseLineHeight: 1.4,
    baseFontSize: 14,
    headingFontFamily: 'Montserrat, sans-serif',
    headingFontWeight: 700,
    headingLineHeight: 1.125,
    monoFontFamily: '"Source Code Pro", monospace',
    monoFontWeight: 500
  },
  borderRadius: { sm: 6, md: 10, lg: 20 },
  spacing: {
    paddingSm: { mobile: 10, tablet: 10, desktop: 12 },
    paddingMd: { mobile: 16, tablet: 22, desktop: 28 },
    paddingLg: { mobile: 22, tablet: 28, desktop: 36 },
    headerIndent: 18
  },
  layout: {
    pageWidth: 1016,
    pagePadding: 18
  },
  bp: {
    mobile: 480,
    small: 640,
    tablet: 768,
    desktop: 1020,
    large: 1280
  },
  buttons: {
    borderRadius: 10
  }
}

export default theme
