import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const scrollbarStyle = Styles.style({
  $nest: {
    '&::-webkit-scrollbar-track': {
      borderRadius: '12px',
      border: '1px solid transparent',
      backgroundColor: 'unset'
    },
    '&::-webkit-scrollbar': {
      width: '8px',
      backgroundColor: 'unset'
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '12px',
      background: '#d3d3d3 0% 0% no-repeat padding-box'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#bababa 0% 0% no-repeat padding-box'
    }
  }
})

export const tokenStyle = Styles.style({
  $nest: {
    '&:hover': {
      background: Theme.action.hover
    },
    '&.is-selected': {
      background: Theme.action.active,
      $nest: {
        '.token-symbol': {
          fontWeight: 600
        }
      }
    }
  }
})

export default Styles.style({
  $nest: {
    '.box-shadow > div': {
      boxShadow: '0 3px 6px -4px rgba(0,0,0,.12), 0 6px 16px 0 rgba(0,0,0,.08), 0 9px 28px 8px rgba(0,0,0,.05)'
    },
    '.pointer': {
      cursor: 'pointer'
    },
    'i-input > input': {
      background: 'transparent'
    }
  }
})
