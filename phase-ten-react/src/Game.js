import Header from './Header'
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';


import images from './images'

const colors = ['Yellow', 'Green', 'Blue', 'Red']
const numbers = [...Array(12).keys()]
const wilds = [...Array(8).keys()]
const skips = [...Array(4).keys()]

var deck = [];

for(var i of colors){
  for(var j of numbers){
    deck.push({
      name: i + (j+1)
    })
  }
}

for(i of wilds){
  deck.push({
    name: 'Wild' + (i+1)
  })
}

for(i of skips){
  deck.push({
    name: 'Skip' + (i+1)
  })
}

const users = [
  {
    name: "justin",
    phase: 2,
    score: 100,
  },
  {
    name: "rebecca",
    phase: 3,
    score: 10,
  },
  {
    name: "michele",
    phase: 3,
    score: 50,
  },
]

shuffle(deck);

function shuffle(list){
  list.sort(() => Math.random() - 0.5)
}

function ShowCard(props){
  return (
    <img width="50px" style={{marginRight: "10px"}} alt={props.name} key={props.name} src={images[props.name]}/>
  )
}

// function ShowAllCards() {
//   return (
//     <div style={{display: "inline-block"}}>
//       {deck.map(i => {
//         return <ShowCard name={i.name}/>
//       })}
//     </div>
//   )
// }

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  console.log(startIndex, endIndex);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

var deckSlice = deck.slice(0, 10);

function onDragEnd(result) {
  // dropped outside the list
  if (!result.destination) {
    return;
  }

  const items = reorder(
    deckSlice,
    result.source.index,
    result.destination.index
  );

  deckSlice = items;
  return deckSlice;
}

function ShowFewCards() {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      // justifyContent="center"
      style={{ marginTop: '30px', marginBottom: '30px'}}
    >

      <Grid item xs={3}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {deckSlice.map((card, index) => (
                  <Draggable key={card.name} draggableId={card.name} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <ShowCard name={card.name}/>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Grid>
  );
  // return (
  //   // <DragDropContext>
  //   //   <Droppable>
  //   <>
  //       {["Yellow1", "Yellow2", "Yellow3", "Yellow4"].map((card) => {
  //         return (
  //           // <Draggable key={card}>
  //             <ShowCard name={card}/>
  //           // </Draggable>
  //         )
  //       })}
  //   </>
  //   //   </Droppable>
  //   // </DragDropContext>
  // )
}

function CommunityCards(){
  return (
    <>
      <ShowCard name="CardBack"/>
      <ShowCard name={deck[0].name}/>
    </>
  )
}

function CommunityCardsSection(){
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      // justifyContent="center"
      style={{ marginTop: '30px', marginBottom: '30px'}}
    >

      <Grid item xs={3}>
        <CommunityCards/>
        {/* <Button onclick={}></Button> */}
      </Grid>   
   
    </Grid>
  )
}

function ScoreSection() {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Phase</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.name}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phase}</TableCell>
                  <TableCell>{user.score}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

function Game() {
  return (
    <>
      <Header/>
      <CommunityCardsSection/>
      <ShowFewCards/>
      <ScoreSection/>
    </>
  )
}

export default Game