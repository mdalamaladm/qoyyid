import add from '@/components/Icon/add'
import chevronLeft from '@/components/Icon/chevronLeft'
import chevronRight from '@/components/Icon/chevronRight'
import close from '@/components/Icon/close'
import difference from '@/components/Icon/difference'
import edit from '@/components/Icon/edit'
import logout from '@/components/Icon/logout'
import menu from '@/components/Icon/menu'
import more from '@/components/Icon/more'
import preview from '@/components/Icon/preview'
import save from '@/components/Icon/save'

let icons = {
  add,
  chevronLeft,
  chevronRight,
  close,
  difference,
  edit,
  logout,
  menu,
  more,
  preview,
  save,
}

export default function ({ name, ...props }) {
  const Icon = icons[name]
  
  return <Icon {...props} />
}
