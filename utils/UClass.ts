import objToClassName from '@/utils/objToClassName'

export default class UClass {
  static label (error: boolean) {
    return objToClassName({
      'block ml-1 text-qoyyid-dark-accent group-focus-within:text-qoyyid-accent': true,
      'text-qoyyid-error group-focus-within:text-qoyyid-error': error,
    })
  }

  static input (error: boolean, block: boolean) {
    return objToClassName({
      'px-2 py-1 rounded-lg border-2 outline-none border-qoyyid-dark-accent focus:border-qoyyid-accent': true,
      'border-qoyyid-error focus:border-qoyyid-error': error,
      'w-full': block,
    })
  }
  
  static message (error: boolean) {
    return objToClassName({
      'ml-1 text-xs': true,
      'text-qoyyid-error': error,
    })
  }
  
  static button ({ type, color, block, style, icon }: { type: string, color: string, block?: boolean, style?: string, icon: string }) {
    const types = {
      solid: '',
      outlined: 'border-2',
      link: '',
    }
    
    const colors = {
      'solid-main': 'bg-qoyyid-main active:bg-qoyyid-light-gray disabled:bg-qoyyid-gray text-qoyyid-accent disabled:text-qoyyid-gray',
      'solid-secondary': 'bg-qoyyid-secondary active:bg-qoyyid-light-gray disabled:bg-qoyyid-gray text-qoyyid-accent disabled:text-qoyyid-gray',
      'solid-accent': 'bg-qoyyid-accent active:bg-qoyyid-dark-accent disabled:bg-qoyyid-gray text-qoyyid-main',
      'solidinv-accent': 'bg-qoyyid-gray active:bg-qoyyid-dark-accent disabled:bg-qoyyid-accent text-qoyyid-main',
      'outlined-main': 'border-qoyyid-main active:border-qoyyid-light-gray disabled:border-qoyyid-gray text-qoyyid-main active:text-qoyyid-light-gray disabled:text-qoyyid-gray',
      'outlined-secondary': 'border-qoyyid-secondary active:border-qoyyid-light-gray disabled:border-qoyyid-gray text-qoyyid-secondary active:text-qoyyid-light-gray disabled:text-qoyyid-gray',
      'outlined-accent': 'border-qoyyid-accent active:border-qoyyid-dark-accent disabled:border-qoyyid-gray text-qoyyid-accent active:text-qoyyid-dark-accent disabled:text-qoyyid-gray',
      'link-main': 'text-qoyyid-main active:text-qoyyid-light-gray disabled:text-qoyyid-gray',
      'link-secondary': 'text-qoyyid-secondary active:text-qoyyid-light-gray disabled:text-qoyyid-gray',
      'link-accent': 'text-qoyyid-accent active:text-qoyyid-dark-accent disabled:text-qoyyid-gray',
    }
    
    return `group rounded-lg ${types[type]} ${colors[`${type}-${color}`] || ''} ${block && !icon ? 'w-full' : ''} ${style}`
  }
  
  static iconButton (type: string, color: string) {
    const colors = {
      'solid-main': 'fill-qoyyid-accent group-active:fill-qoyyid-dark-accent group-disabled:fill-qoyyid-gray',
      'solid-secondary': 'fill-qoyyid-accent group-active:text-qoyyid-dark-accent group-disabled:fill-qoyyid-gray',
      'solid-accent': 'fill-qoyyid-main group-active:fill-qoyyid-light-gray',
      'outlined-main': 'fill-qoyyid-main group-active:fill-qoyyid-light-gray group-disabled:fill-qoyyid-gray',
      'outlined-secondary': 'fill-qoyyid-secondary group-active:fill-qoyyid-light-gray group-disabled:fill-qoyyid-gray',
      'outlined-accent': 'fill-qoyyid-accent group-active:fill-qoyyid-dark-accent group-disabled:fill-qoyyid-gray',
      'link-main': 'fill-qoyyid-main group-active:fill-qoyyid-light-gray group-disabled:fill-qoyyid-gray',
      'link-secondary': 'fill-qoyyid-secondary group-active:fill-qoyyid-light-gray group-disabled:fill-qoyyid-gray',
      'link-accent': 'fill-qoyyid-accent group-active:fill-qoyyid-dark-accent group-disabled:fill-qoyyid-gray',
    }
    
    return `${colors[`${type}-${color}`]}`
  }
}