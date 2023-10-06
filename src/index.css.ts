import { Styles } from '@ijstech/components';
const Theme = Styles.Theme.ThemeVars;

export const imageStyle = Styles.style({
  $nest: {
    '&>img': {
      maxWidth: 'unset',
      maxHeight: 'unset',
      borderRadius: 4
    }
  }
})

export const markdownStyle = Styles.style({
  overflowWrap: 'break-word'
})

export const inputStyle = Styles.style({
  $nest: {
    '> input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      color: Theme.input.fontColor,
      fontSize: 'inherit'
    }
  }
})

export const tokenSelectionStyle = Styles.style({
  $nest: {
    'i-button.token-button': {
      justifyContent: 'start'
    }
  }
})

export const buttonStyle = Styles.style({
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  gap: '0.5rem'
})

export default Styles.style({
  $nest: {
    '#gridTokenInput': {
      boxShadow: 'none',
      outline: 'none',
      borderRadius: 'inherit',
      border: 'inherit',
      transition: 'all .5s ease-in'
    },
    '#gridTokenInput.focus-style': {
      // border: `1px solid ${Theme.colors.primary.main}`,
      // boxShadow: '0 0 0 2px rgba(87, 75, 144, .2)'
    },
    // '.custom-border': {
    //   border: 'none',
    //   borderRadius: 'inherit',
    //   height: '100%'
    // }
  }
})
