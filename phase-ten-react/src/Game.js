import Header from './Header'

const colors = ['Yellow', 'Green', 'Blue', 'Red']
const numbers = [...Array(12).keys()]
const wilds = [...Array(8).keys()]
const skips = [...Array(4).keys()]



function CardSection() {
  return (
    <>
      <div style={{display: "inline-block"}}>
        {colors.map(i => (
          numbers.map(j => (
            <img width="30px" style={{marginRight: "10px"}} alt={i + " " + j} key={'./cards/' + i + '-' + (j+1) + '.svg'} src={require('./cards/' + i + '-' + (j+1) + '.svg')}/>
            )
          )
        ))}
        <br/>
        {wilds.map(j => (
          <img width="30px" style={{marginRight: "10px"}} alt="Wild" key={'./cards/Wild-' + (j+1) + '.svg'} src={require('./cards/Wild-' + (j+1) + '.svg')}/>
          )
        )}
        <br/>
        {skips.map(j => (
          <img width="30px" style={{marginRight: "10px"}} alt="Skip" key={'./cards/Skip-' + (j+1) + '.svg'} src={require('./cards/Skip-' + (j+1) + '.svg')}/>
          )
        )}
      </div>
    </>
  )
}

function ScoreSection() {
  return (
    <>
      Scores
    </>
  )
}

function Game() {
  return (
    <>
      <Header/>
      <CardSection/>
      <ScoreSection/>
    </>
  )
}

export default Game