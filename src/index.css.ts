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
      color: Theme.input.fontColor
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

export default Styles.style({
  $nest: {
    '.focus-style': {
      border: `1px solid ${Theme.colors.primary.main}`,
      boxShadow: '0 0 0 2px rgba(87, 75, 144, .2)'
    }
  }
})
