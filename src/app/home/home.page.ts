import { Component } from '@angular/core';
import {trigger, style, animate, transition} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(2000, style({opacity: 1}))
      ]) 
    ])
  ]
})
export class HomePage {
  public squares: string[];
  public dificult: string;
  public random:number[];
  public gameOver: boolean;
  public turn: string;
  public winner: string;

  constructor() {
    this.squares= Array(9).fill(null);
    this.random=[0,1,2,3,4,5,6,7,8];
    this.dificult = '';
    this.gameOver= false;
    this.turn = 'player1';
  }

  changeTurn(){
    if(this.turn == 'player1'){
      this.turn= 'player2'
    } else{
      this.turn= 'player1'
    }
  }

  selectDificult(){
    this.dificult= 'easy';
  }
  bot(){
    if(!this.gameOver){
      if(this.turn == 'player2'){
        let rand = this.random[Math.floor(Math.random() * this.random.length)];
        if(this.squares[rand] == null ){
          this.squares.splice(rand,1,'O');
          this.random.splice(rand,1);
        } else{
          let found= this.squares.find(element => element == null);
          rand= this.squares.indexOf(found);
          this.squares[rand]='O';
        }
        this.changeTurn();
        this.checkWinner();
      }
    }
  }
  
  move(pos){
      if(!this.gameOver){
        if(this.turn == 'player1'){
          if(!this.squares[pos]){
            this.squares.splice(pos,1,'X');
            this.changeTurn();
            this.checkWinner();  
          }
        } this.bot2();
      }
  }
  tryAgain(){
    this.squares= Array(9).fill(null);
    this.gameOver= false;
    this.turn = 'player1'
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
        this.gameOver = true;
        this.winner = this.squares[line[0]];
      }
    }
  }

  bot2(){
    if(!this.gameOver){
      if(this.turn == 'player2'){
        if(!this.squares[4]){
          this.squares[4]= 'O'
        } else if(!this.squares[0] && !this.squares[2] && !this.squares[6] && !this.squares[8]){
                let corners= [0, 2, 6, 8];
                let rand= corners[Math.floor(Math.random() * corners.length)];
                this.squares[rand]= 'O'
        } else{
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
            if(this.squares[line[0]]=='X' && this.squares[line[1]]=='X' && !this.squares[line[2]]){
              console.log('adentro1')
              this.squares[line[2]]= 'O'
            } else if(this.squares[line[0]]=='X' && !this.squares[line[1]] && this.squares[line[2]]=='X'){
              this.squares[line[1]]= 'O'
              console.log('adentro2')
            } else if(!this.squares[line[0]] && this.squares[line[1]]=='X' && this.squares[line[2]]=='X'){
              this.squares[line[0]]='O'
              console.log('adentro3')
            }
          }
        }
      }
      this.changeTurn();
      this.checkWinner();
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

/* 
if(!this.squares[pos]){
          this.squares.splice(pos,1,'X');
          let rand = this.random[Math.floor(Math.random() * this.random.length)];
          if(this.squares[rand] == null ){
            this.squares.splice(rand,1,'O')
            this.random.splice(rand,1)
          } else{
            let found= this.squares.find(element => element == null)
            rand= this.squares.indexOf(found)
            this.squares[rand]='O'
          }
        }
*/