import { useDispatch, useSelector } from 'react-redux'
import { setTitleFilter, selectTitleFilter, resetFilters } from '../../redux/slices/filterSlice'
import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch()
  const titleFilter = useSelector(selectTitleFilter)

  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handlleResetFilters = () => {
    dispatch(resetFilters())
  }
  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
            value={titleFilter}
          />
        </div>
        <button
          type="button"
          onClick={handlleResetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default Filter
