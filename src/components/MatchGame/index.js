import {Component} from 'react'
import TabItem from '../TabItem'
import Thumbnails from '../Thumbnails'

import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {imgList, tabList} = this.props
    this.imgList = imgList
    this.state = {
      seconds: 60,
      score: 0,
      activeTabId: tabList[0].tabId,
      index: 0,
      displayScoreCard: false,
    }
    this.startTimer()
  }

  startTimer = () => {
    this.secondTimerId = setInterval(this.secondIncrement, 1000)
  }

  secondIncrement = () => {
    const {seconds} = this.state
    if (seconds === 0) {
      clearInterval(this.secondTimerId)
      this.setState({displayScoreCard: true})
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
  }

  clickingTab = uniqueId => {
    this.setState({activeTabId: uniqueId})
  }

  clickingThumbnailImg = (imgID, imgList = this.imgList) => {
    const {index} = this.state
    const displayingImgID = imgList[index].id

    if (displayingImgID === imgID) {
      const randomIndex = Math.floor(Math.random() * imgList.length)
      this.setState(prevState => ({
        index: randomIndex,
        score: prevState.score + 1,
      }))
    } else {
      clearInterval(this.secondTimerId)
      this.setState({displayScoreCard: true})
    }
  }

  playAgain = () => {
    this.setState({score: 0, seconds: 60, displayScoreCard: false})
    this.startTimer()
  }

  render() {
    const {seconds, activeTabId, index, score, displayScoreCard} = this.state
    const {imgList, tabList} = this.props

    const filteredImgList = imgList.filter(
      each => each.category === activeTabId,
    )

    const randomImgUrl = imgList[index].imageUrl
    return (
      <div className="bg-container">
        <nav className="nav-header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png "
            alt="website logo"
            className="web-logo"
          />

          <ul className="score-and-timer">
            <li>
              <p className="score">
                Score: <span className="score-color">{score}</span>
              </p>
            </li>

            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-img"
              />
            </li>
            <li>
              <p className="timer-count score-color">
                {seconds < 10 ? `0${seconds}` : seconds} sec
              </p>
            </li>
          </ul>
        </nav>
        <div className="card-container1">
          {!displayScoreCard ? (
            <div className="card-container2">
              <div>
                <img src={randomImgUrl} alt="match" className="display-img" />
              </div>
              <ul className="ul-div">
                {tabList.map(each => (
                  <TabItem
                    key={each.tabId}
                    tabDetails={each}
                    clickingTab={this.clickingTab}
                    isTabClicked={activeTabId === each.tabId}
                  />
                ))}
              </ul>
              <ul className="ul-div">
                {filteredImgList.map(each => (
                  <Thumbnails
                    key={each.id}
                    imgDetails={each}
                    clickingThumbnailImg={this.clickingThumbnailImg}
                  />
                ))}
              </ul>
            </div>
          ) : (
            <div className="score-bg">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
                className="trophy-img"
              />
              <p className="display-score">YOUR SCORE</p>
              <p className="display-score-value">{score}</p>
              <button type="button" className="btn" onClick={this.playAgain}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  alt="reset"
                  className="reset-img"
                />
                PLAY AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
