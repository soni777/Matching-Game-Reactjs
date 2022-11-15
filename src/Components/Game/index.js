import {Component} from 'react'

import Tab from '../Tab'

import Image from '../Image'

import './index.css'

class Game extends Component {
  state = {
    activeTab: '',
    currentImageUrl: '',
    score: 0,
    seconds: 60,
    gameOn: true,
  }

  getFilteredImages = () => {
    const {imagesList} = this.props
    const {activeTab} = this.state
    const activeTabImagesList = imagesList.filter(
      each => each.category === activeTab,
    )
    return activeTabImagesList
  }

  getNavigationBar = () => {
    const {score, seconds} = this.state
    return (
      <nav className="navbar">
        <img
          className="logo"
          src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          alt="website logo"
        />
        <ul className="nav-links">
          <li className="navlink">
            <p>
              Score: <span className="highlight"> {score}</span>
            </p>
          </li>
          <li className="navlink">
            <img
              className="timer-icon"
              src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              alt="timer"
            />
            <p className="highlight"> {seconds} Sec</p>
          </li>
        </ul>
      </nav>
    )
  }

  renderGame = () => {
    const {activeTab, currentImageUrl} = this.state
    const {tabsList} = this.props
    const filteredImages = this.getFilteredImages()
    return (
      <>
        <img className="image" src={currentImageUrl} alt="match" />
        <ul className="tabsList">
          {tabsList.map(each => (
            <Tab
              key={each.tabId}
              tabDetails={each}
              onChangeTab={this.onChangeTab}
              isActive={activeTab === each.tabId}
            />
          ))}
        </ul>
        <ul className="imagesList">
          {filteredImages.map(each => (
            <Image
              key={each.id}
              imageDetails={each}
              checkTheMatch={this.checkTheMatch}
            />
          ))}
        </ul>
      </>
    )
  }

  renderEndgame = () => {
    const {score} = this.state
    return (
      <div className="endgame-card">
        <img
          className="trophy-img"
          alt="trophy"
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        />
        <p className="score-title">YOUR SCORE</p>
        <h1 className="total-score">{score}</h1>
        <button
          className="play-btn"
          type="button"
          onClick={this.onClickPlayagain}
        >
          <img
            className="reset-icon"
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
          />
          PLAY AGAIN
        </button>
      </div>
    )
  }

  onClickPlayagain = async () => {
    await this.setState({score: 0, seconds: 60, gameOn: true})
    this.startGame()
  }

  onChangeTab = tabId => {
    this.setState({activeTab: tabId})
  }

  getRandomImage = () => {
    const {imagesList} = this.props
    const url =
      imagesList[Math.ceil(Math.random() * imagesList.length - 1)].imageUrl
    return url
  }

  checkTheMatch = imageUrl => {
    const {currentImageUrl} = this.state
    if (currentImageUrl === imageUrl) {
      const url = this.getRandomImage()
      this.setState(prevState => ({
        score: prevState.score + 1,
        currentImageUrl: url,
      }))
    } else {
      clearInterval(this.timerID)
      this.setState({gameOn: false})
    }
  }

  componentDidMount = async () => {
    const {tabsList, imagesList} = this.props
    await this.setState({
      activeTab: tabsList[0].tabId,
      currentImageUrl: imagesList[0].imageUrl,
    })
    this.startGame()
  }

  startGame = () => {
    this.timerID = setInterval(this.tick, 1000)
  }

  tick = async () => {
    const {gameOn, seconds} = this.state
    if (gameOn) {
      if (seconds > 1) {
        this.setState(prevState => ({seconds: prevState.seconds - 1}))
      } else {
        await this.setState({gameOn: false, seconds: 0})
        clearInterval(this.timerID)
      }
    } else {
      clearInterval(this.timerID)
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.timerID)
  }

  render() {
    const {gameOn} = this.state
    return (
      <div className="app-container">
        {this.getNavigationBar()}
        <div className="bottom-container">
          {gameOn && this.renderGame()}
          {!gameOn && this.renderEndgame()}
        </div>
      </div>
    )
  }
}

export default Game
