import type { MenuCategory } from '../types/order'
import { money } from '../utils/orderUtils'

export function displayMenu(raw: MenuCategory[]) {
  return raw.map((cat) => ({
    ...cat,
    items: cat.items.map((it) => ({
      ...it,
      priceStr: money(it.price),
      hasOptions: it.options.length > 0,
      hasAddons: it.addons.length > 0,
      addons: it.addons.map((a) => ({
        ...a,
        label: `${a.name} +$${money(a.price)}`,
      })),
    })),
  }))
}

export type DisplayMenuCategory = ReturnType<typeof displayMenu>[number]
export type DisplayMenuItem = DisplayMenuCategory['items'][number]

export const EMPTY_ITEM_FORM = {
  category: '',
  name: '',
  price: '',
  desc: '',
  options: '',
  addons: [] as { name: string; price: number }[],
  addonName: '',
  addonPrice: '',
}
