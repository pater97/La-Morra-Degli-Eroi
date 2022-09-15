// react import
import { Component } from "react"
// importo il routing 
import withRouter from "../withRouter";
// screen import 
import Result from "./Result"
// component import
import Button from "../components/ui/button/Button"
import Stats from "../components/components_for_page/Stats"
// importo regole di gioco
import matrici from "../assets/rules/rules"

class Game extends Component {

  constructor(props) {

    super(props)
    // choiche
    this.hands = ['✋🏻','✌🏻','👊🏻']
    // points
    this.state = {
      points: {
        user: 0,
        cpu: 0
      },
      // dynamic games
      attempts: 1,
      moves: {
        user: 5,
        cpu: 5
      },
      result: {},
      // managment result page
      victory: null,
      showResult: false,
      showGame: true,
      showResultScreen: false,
      // local storage variables
      player: '',
      players: []
    }
  }

  // call ranking
  callBackRanking(){
    this.props.callBackAppRanking()
  }

  // restart setting game
  restart(){
    this.setState({
      moves: {
        user: 5,
        cpu: 5
      },
      points: {
        user: 0,
        cpu: 0
      },
      result: {
        label: ''
      },
      attempts: 1,
      showResult: false,
      showGame: true,
      showResultScreen: false
    })
  }

  // get user move
  getMove(e){
    this.state.moves.user = e.target.id
    // set state for class css
    this.setState({
      active: this.state.moves.user
    })
  }
  
  getResult(){
    // random variabiles that active superpower
    let randomWon = Math.floor(Math.random() * 10) + 1
    // let randomWon = Math.floor(Math.random() * 1) + 1

    // assign random move to cpu
    this.state.moves.cpu = Math.floor(Math.random() * 3)
    this.state.result = matrici[this.state.moves.user][this.state.moves.cpu]
    
    // calc the result
    if(this.state.result.won === true){
      this.state.points.user++
      this.state.attempts++
    } else if(this.state.result.losses === true){
      this.state.points.cpu++
      this.state.attempts++
    }
    // get player local storage
    this.state.player = JSON.parse(localStorage.getItem('user'))
    
    // calc final result
    if(this.state.attempts > 3){
      if(this.state.points.user > this.state.points.cpu){
        this.state.victory = 0       
        this.state.player.gameWon++
      } else if (randomWon === 1) {
        this.state.victory = 1  
        this.state.player.gameWon++
      }
        else{
        this.state.victory = 2
      }
      
      // new array local storage for players
      let playerList = []
      // variables that check if player is already in the storage
      let find = true
      
      // check if the storage exist
      if(!!localStorage.getItem('players')){
        playerList = JSON.parse(localStorage.getItem('players'))
        
        // cycle the players to find the same email
        playerList.forEach(element => {
          if(element.mail === this.state.player.mail){
            element.gameWon += this.state.player.gameWon
            find = false
          }
        })
        
        // if doesn't exist the player create new record
        if(find){
          playerList.push(this.state.player)
        }
      }
      
      // store new record
      localStorage.setItem('players', JSON.stringify(playerList))

      // manage page
      this.setState({
        showGame: false,
        showResultScreen: true
      })
    }
    
    // show points
    this.setState({
      showResult: true
    })
  }

  render() {
    return (
      <>
        {
          this.state.showGame === true &&
          <div className="Game">
            <Stats 
              round={this.state.attempts}
              rankCpu={this.state.points.cpu}
              rankUser={this.state.points.user}
            />

            <div className="game-container">
              {
                this.state.showResult &&
                <p>{this.state.result.cpuLabel}</p>
              }

              <div className="hands-container cpu-hands">
                {
                  this.hands.map((element, key) =>{
                    return(
                      <div className={`hand ${Number(this.state.moves.cpu) === key ? "active active-cpu" : "notactive"}`} key={key} onClick={this.getMove.bind(this)}>{element}</div>
                    )
                  })
                }
              </div>

              {
                this.state.showResult &&
                this.state.result.won === true ?
                <p className="result green">{this.state.result.label}</p> :
                this.state.result.losses === true ?
                <p className="result red">{this.state.result.label}</p> :
                <p className="result">{this.state.result.label}</p>
              }

              <Button
                callBack={this.getResult.bind(this)}
              />

              <div className="hands-container user-hands">
                {
                  this.hands.map((element, key) =>{
                    return(
                      <div className={`hand ${Number(this.state.moves.user) === key ? "active active-user" : "notactive"}`} key={key} id={key} onClick={this.getMove.bind(this)}>{element}</div>
                    )
                  })
                }
              </div>

              {
                this.state.showResult &&
                <p>{this.state.player.name} {this.state.result.userLabel}</p>
              }
            </div>

          </div>
        }
        {
          this.state.showResultScreen &&
          <>
            <Result
              result={this.state.result.label}
              cpuPoints={this.state.points.cpu}
              userPoints={this.state.points.user}
              victory={this.state.victory}
              callBackRank={this.callBackRanking.bind(this)}
              callBackRestart={this.restart.bind(this)}
              userName={this.state.player.name}
            />
          </>
        }
      </>
    )
  }
}

export default withRouter(Game)