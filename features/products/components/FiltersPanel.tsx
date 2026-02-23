import CategoryFilter from './CategoryFilter'
import PriceFilter from './PriceFilter'
import ColorFilter from './ColorFilter'
import SizeFilter from './SizeFilter'

const FiltersPanel = () => {
  return (
    <aside>
        <CategoryFilter />
        <PriceFilter />
        <ColorFilter />
        <SizeFilter />
    </aside>
  )
}

export default FiltersPanel