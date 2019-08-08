import React from "react";
import ReactDOM from "react-dom";
import { FireEmblemDrafter } from "./components/FireEmblemDrafter/FireEmblemDrafter";

const ROSTER = [
  'Eirika','Ephraim','Seth','Franz','Gilliam','Vanessa','Moulder','Ross',
  'Garcia','Neimi','Colm','Artur','Lute','Natasha','Joshua','Forde',
  'Kyle','Tana','Amelia','Innes','Gerik','Tethys','Marisa','Ewan',
  'Duessel','Cormag','L\'Arachel','Dozla','Saleh','Rennac','Knoll',
  'Myrrh','Syrene',
];
const TEAM_SIZE = 18;

ReactDOM.render(<FireEmblemDrafter roster={ROSTER} teamSize={TEAM_SIZE} isRandom />, document.getElementById("root"));
