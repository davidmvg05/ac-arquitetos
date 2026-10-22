export const useHeaderState = () => {
  const isPastFirstSection = useState<boolean>('header_past_first_section', () => false)
  const isHeaderHidden = useState<boolean>('header_hidden', () => false)
  const isMenuOpen = useState<boolean>('menu_open', () => false)
  const isHeaderVisible = useState<boolean>('header_visible', () => true)

  const setPastFirstSection = (past: boolean) => {
    isPastFirstSection.value = past
  }

  const setHeaderHidden = (hidden: boolean) => {
    isHeaderHidden.value = hidden
  }

  const setHeaderVisible = (visible: boolean) => {
    isHeaderVisible.value = visible
    isHeaderHidden.value = !visible
  }

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  return {
    isPastFirstSection,
    isHeaderHidden,
    isHeaderVisible,
    isMenuOpen,
    setPastFirstSection,
    setHeaderHidden,
    setHeaderVisible,
    toggleMenu,
    closeMenu
  }
}
