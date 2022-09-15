// react import
import { Component } from "react"
// importo il routing 
import withRouter from "../withRouter";
// lottie import
import { Player, Controls } from '@lottiefiles/react-lottie-player';
// component import
import Button from "../components/ui/button/Button";

class Result extends Component{
    constructor(props){
        super(props)
        this.userName = this.props.router.location.state.userName
        this.victory = this.props.router.location.state.victory
        this.cpuPoints = this.props.router.location.state.points.cpu
        this.userPoints = this.props.router.location.state.points.user
    }

    showRank(){
        this.props.router.navigate('/Ranking')
    }
    restartGame(){
        this.props.router.navigate('/Game')
    }

    render(){
        return(
            <div className="Result">
                {
                    this.victory === 0 ? <h2>Hai battuto il villain<br/><span className="font-bigger">Complimenti!</span></h2>
                    : this.victory === 1 ? <><h2>Fantastico!<br/>Il villain è stato sconfitto</h2><p>Stavi per essere battuto, ma hai attivato un potere speciale che ti ha permesso di sconfiggere il villain</p></>
                    : <h2>Sei stato sconfitto dal villain<br/><span className="font-bigger">Game over!</span></h2>
                }
                <div className="summary">
                    <h5>Ecco i risultati</h5>
                    <p>
                        CPU: {this.cpuPoints} <br />
                        {this.userName}: {this.userPoints}
                    </p>

                    <div className="button-container">
                      <Button 
                        label={"Classifica"} 
                        callBack={this.showRank.bind(this)}
                      />

                      <Button 
                        label={"Riprova"} 
                        callBack={this.restartGame.bind(this)}
                      />
                    </div>
                </div>

                {
                    this.victory === 0 ?
                    <Player
                        autoplay
                        loop
                        src="https://assets6.lottiefiles.com/animated_stickers/lf_tgs_v66fdky5.json"
                        >
                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                    : this.victory === 1 ?
                    <Player
                        autoplay
                        loop
                        src="https://assets10.lottiefiles.com/private_files/lf30_zzhwy8ge.json"
                        >
                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                    :
                    <Player
                        autoplay
                        loop
                        src="https://assets3.lottiefiles.com/packages/lf20_pmhkmyc5.json"
                        >
                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                }
            </div>
        )
    }
}

export default withRouter(Result)