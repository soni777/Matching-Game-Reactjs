import './index.css'

const Tab = props => {
  const {tabDetails, onChangeTab, isActive} = props
  const {displayText, tabId} = tabDetails
  const onClickTab = () => {
    onChangeTab(tabId)
  }
  const tabActive = isActive ? 'active' : ''
  return (
    <li className={`tab ${tabActive}`}>
      <button className="button" type="button" onClick={onClickTab}>
        {displayText}
      </button>
    </li>
  )
}

export default Tab
