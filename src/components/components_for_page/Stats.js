import PropTypes from "prop-types"

function Stats(props) {

  return (
    <div className="stats">
        <p>Round {props.round}</p>
        <p>{props.rankCpu} - {props.rankUser}</p>
    </div>
  )
}

Stats.propTypes = {
    round: PropTypes.number,
    rankCpu: PropTypes.number,
    rankUser: PropTypes.number
}

Stats.defaultProps = {
    round: 1,
    rankCpu: 0,
    rankUser: 0
}

export default Stats