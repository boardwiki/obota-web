import {reactive} from "vue"

type CloseFunction = () => void

const openDropdownClosers = reactive(new Set<CloseFunction>())

export function useDropdownManager() {
  const registerCloser = (closeFn: CloseFunction) => {
    openDropdownClosers.add(closeFn)
  }

  const unregisterCloser = (closeFn: CloseFunction) => {
    openDropdownClosers.delete(closeFn)
  }

  const closeAllDropdowns = () => {
    openDropdownClosers.forEach((closeFn) => {
      closeFn()
    })
  }

  return {
    registerCloser,
    unregisterCloser,
    closeAllDropdowns,
  }
}
