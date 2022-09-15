// import react component
import { Component } from "react"
// importo il routing 
import withRouter from "../withRouter";
// import components
import Button from "../components/ui/button/Button"
import InputBox from "../components/ui/inputBox/InputBox"

// lottie import
import { Player, Controls } from "@lottiefiles/react-lottie-player"

class Home extends Component {
  constructor(props) {
    
    super(props)
    this.user =
      {
      name: '',
      mail: '',
      gameWon: 0
      }
  }

  // pass input value to App
  getValue(e) {
    this.user.name = e.target.value
  }

  getEmail(e) {
    this.user.mail = e.target.value
  }

  clickButton() {
    console.log(this.user)
    localStorage.setItem('user', JSON.stringify(this.user))
    this.props.router.navigate('/Game')
  }

  render() {
    return (
      <div className="Home">
        <h1>LA MORRA DEGLI EROI</h1>
        <form>
          <InputBox
            placeholder={"Inserisci il tuo nome"}
            callBack={this.getValue.bind(this)}
          />
          <InputBox
            placeholder={"Inserisci la tua email"}
            callBack={this.getEmail.bind(this)}
            type={"email"}
          />
          <Button
            label={"Inizia la sfida"}
            callBack={this.clickButton.bind(this)}
          />
        </form>

        <Player
          autoplay
          loop
          src="https://assets7.lottiefiles.com/animated_stickers/lf_tgs_j7miwfxd.json"
          style={{ height: "300px", width: "300px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      </div>
    )
  }
}

export default withRouter(Home)
