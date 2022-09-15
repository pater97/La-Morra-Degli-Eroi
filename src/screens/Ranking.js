// react import
import { Component } from "react"
// components import
import Button from "../components/ui/button/Button"

class Ranking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rank: [],
      value: false,
    }
  }
  //when component mount rank is populed by record
  componentDidMount() {
    this.state.rank = JSON.parse(localStorage.getItem("players"))
    if (this.state.rank.length > 0) {
      this.setState({
        value: true,
      })
    } else {
      this.setState({
        value: false,
      })
    }
  }

  propShowHome() {
    this.props.callbackShowHome()
  }
  propShowGame() {
    this.props.callbackShowGame()
  }

  render() {
    return (
      <div className="Ranking">
        <div className="ranking-container">
          <h1>Classifica</h1>
            
          <ul>
            {this.state.value &&
              this.state.rank.map((user, key) => {
                return (
                  <>
                  <li key={key}>
                    <span>{user.name}:</span> <span>{user.gameWon} partite vinte</span>
                  </li>
                  {
                    key == 0 &&
                    <img src={require("../assets/images/all-might.webp")} alt="" />
                  }
                  </>
                )
              })}
          </ul>
          {/* nel caso in cui l'array fosse vuoto */}
          {this.state.value === false && (
            <h1>NON SONO ANCORA STATI ASSEGNATI PUNTEGGI</h1>
          )}
        </div>

        <div className="button-container">
          <Button
            label={"Inizia una nuova partita"}
            callBack={this.propShowGame.bind(this)}
            objCss={{
              width: 'calc(100% - 20px)'
            }}
          />
          <Button
            label={"Inizia con un nuovo nome"}
            callBack={this.propShowHome.bind(this)}
            objCss={{
              width: 'calc(100% - 20px)',
              backgroundColor: '#fff',
              color: '#000'
            }}
          />
        </div>
      </div>
    )
  }
}

export default Ranking
