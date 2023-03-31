import './index.css'

const TabItem = props => {
  const {tabDetails, clickingTab, isTabClicked} = props

  const {tabId, displayText} = tabDetails

  const onChangeColor = () => {
    clickingTab(tabId)
  }

  const addUniqueColor = isTabClicked ? 'orange-color' : ''
  return (
    <li className="li-row">
      <button
        type="button"
        className={`li-item ${addUniqueColor}`}
        onClick={onChangeColor}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
