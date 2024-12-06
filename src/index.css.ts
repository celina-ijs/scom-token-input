import { Styles } from '@ijstech/components';

export const buttonStyle = Styles.style({
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  gap: '0.5rem',
  $nest: {
    'span': {
      display: 'inline-block',
      marginRight: 'auto',
      marginLeft: '0.5rem'
    }
  }
})

export default Styles.style({
  $nest: {
    '#gridTokenInput': {
      boxShadow: 'none',
      outline: 'none',
      transition: 'all .5s ease-in'
    },
    '#gridTokenInput.focus-style': {
      // border: `1px solid ${Theme.colors.primary.main}`,
      // boxShadow: '0 0 0 2px rgba(87, 75, 144, .2)'
    }
  }
})
