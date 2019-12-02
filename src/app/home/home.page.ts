import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public squares: string[];
  public dificult: string;
  public random:number[];
  public gameOver: boolean;

  constructor() {
    this.squares= Array(9).fill(null);
    this.random=[0,1,2,3,4,5,6,7,8];
    this.dificult = '';
    this.gameOver= false;
  }
  
  selectDificult(){
    this.dificult= 'easy';
  }

  show(pos){
      if(!this.squares[pos]){
        this.squares.splice(pos,1,'X');
        let rand = this.random[Math.floor(Math.random() * this.random.length)]
        if(this.squares[rand] == null ){
          this.squares.splice(rand,1,'O')
          this.random.splice(rand,1)
        } else{
          let found= this.squares.find(element => element == null)
          rand= this.squares.indexOf(found)
          this.squares[rand]='O'
        }
      }
      this.checkWinner();
  }
  checkWinner(){
    let winnerLines= [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ];
    for(let line of winnerLines){
      if(this.squares[line[0]] == this.squares[line[1]] && this.squares[line[1]] == this.squares[line[2]] && this.squares[line[0]] !== null){
        console.log(this.squares[line[0]]+' is winner');
        this.gameOver = true;
      }
    }
  }
}
/* 
else if(this.turn == 'player2'){
      if(!this.squares[pos]){
        this.squares.splice(pos,1,'O')
        this.turn= 'player1'
      }
    }
*/