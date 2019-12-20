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
  public turn: string;
  public winner: string;
  public winnerLines;
  public symbol1: string;
  public symbol2: string;
  public easy: boolean;
  public normal: boolean;
  public hard: boolean;
  public two: boolean;
  public colorX: boolean;
  public colorO: boolean;
  public symbol: string;

  constructor() {
    this.initGame();
  }
  initGame(){
    this.winnerLines= [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ];
    this.squares= Array(9).fill(null);
    this.random=[0,1,2,3,4,5,6,7,8];
    this.dificult = '';
    this.symbol1= '';
    this.gameOver= false;
    this.turn = 'player1';
    this.easy= false;
    this.normal= false;
    this.hard= false;
    this.two= false;
    this.colorX= false;
    this.colorO= false;
  }
  randomCell(){
    let rand = this.random[Math.floor(Math.random() * this.random.length)];
        if(!this.squares[rand]){
          this.squares.splice(rand,1,this.symbol2);
          this.random.splice(rand,1);
        } else{
          let found= this.squares.find(element => element == null);
          rand= this.squares.indexOf(found);
          this.squares[rand]=this.symbol2;
        }
  }

  changeTurn(){
    if(this.turn == 'player1'){
      this.turn= 'player2';
      this.symbol= this.symbol2;
    } else{
      this.turn= 'player1';
      this.symbol= this.symbol1;
    }
  }

  selectDificult(dificult){
    this.dificult= dificult;
    switch(dificult){
      case 'easy':
              this.easy=false;
              this.normal= true;
              this.hard= true;
              this.two= true;
              break;
      case 'normal':
          this.easy=true;
          this.normal= false;
          this.hard= true;
          this.two= true;
          break;
      case 'hard':
          this.easy=true;
          this.normal= true;
          this.hard= false;
          this.two= true;
          break;
      case 'two':
          this.easy=true;
          this.normal= true;
          this.hard= true;
          this.two= false;
          break;                
    }
  }
  selecSymbol(symbol){
    switch(symbol){
      case 'X':
                this.symbol1= 'X';
                this.symbol2= 'O';
                this.colorX= false;
                this.colorO= true;
                this.symbol= this.symbol1;
                break;
      case 'O':
                this.symbol1= 'O';
                this.symbol2= 'X';
                this.colorX= true;
                this.colorO= false;
                  
    }
  }

  bot(){
    if(!this.gameOver){
      if(this.turn == 'player2'){
        this.randomCell();
        this.changeTurn();
        this.checkWinner();
      }
    }
  }
  
  move(pos){
      if(!this.gameOver && this.dificult!== '' && this.symbol1!== ''){
        if(this.turn == 'player1'){
          if(!this.squares[pos]){
            this.squares.splice(pos,1,this.symbol1);
            this.changeTurn();
            this.checkWinner();
          }
        }
         if(this.dificult== 'easy'){
           setTimeout(()=>{
            this.bot();
           },1200)
        }
        else if(this.dificult== 'normal'){
          setTimeout(()=>{
            this.mediumbot();
          },1200);
        } 
        else if(this.dificult == 'hard'){
          setTimeout(()=>{
            this.hardbot();
          },1200);
        }
         else if(this.dificult == 'two'){
          if(!this.squares[pos]){
            this.squares.splice(pos,1,this.symbol2)
            this.changeTurn();
            this.checkWinner();
          }
        }
      }
  }

  tryAgain(){
    this.initGame();
  }

  checkWinner(){
    var check= false;
    for(let line of this.winnerLines){
      if(this.squares[line[0]] == this.squares[line[1]] && this.squares[line[1]] == this.squares[line[2]] && this.squares[line[0]] !== null){
        this.gameOver = true;
        check= true;
        this.winner ='El ganador es '+ this.squares[line[0]];
        break;
      } 
    }
        let found= this.squares.find(e => !e);
        let i= this.squares.indexOf(found);
        if(i == -1 && check== false){
          this.winner= 'empate';
          this.gameOver= true;
        }
  }

tryTie(){
  var check= false;
  for(let line of this.winnerLines){
    if(this.squares[line[0]]==this.symbol1 && this.squares[line[1]]==this.symbol1 && !this.squares[line[2]]){
      this.squares[line[2]]= this.symbol2;
      check= true;
      break;
    } else if(this.squares[line[0]]==this.symbol1 && !this.squares[line[1]] && this.squares[line[2]]==this.symbol1){
      this.squares[line[1]]= this.symbol2;
      check= true;
      break;
    } else if(!this.squares[line[0]] && this.squares[line[1]]==this.symbol1 && this.squares[line[2]]==this.symbol1){
      this.squares[line[0]]=this.symbol2;
      check= true;
      break;
    } 
  }
  if(!check){
    this.randomCell();
  }
}


firstMove(){
  if(!this.squares[4]){
    this.squares[4]= this.symbol2
  } else if(!this.squares[0] && !this.squares[2] && !this.squares[6] && !this.squares[8]){
          let corners= [0, 2, 6, 8];
          let rand= corners[Math.floor(Math.random() * corners.length)];
          this.squares[rand]= this.symbol2
  }
}

  mediumbot(){
    if(!this.gameOver){
      if(this.turn == 'player2'){
        let found= this.squares.find(e => e==this.symbol2);
        if(!found){
          this.firstMove();
        }else{
          this.tryTie();
        }
        this.changeTurn();
        this.checkWinner();
      } 
    }
  }

  hardbot(){
    if(!this.gameOver){
      if(this.turn == 'player2'){
        let found= this.squares.find(e => e==this.symbol2);
        if(!found){
          this.firstMove();
        } else{
          var check= false;
            for(let line of this.winnerLines){
              if(this.squares[line[0]]==this.symbol2 && this.squares[line[1]]==this.symbol2 && !this.squares[line[2]]){
                this.squares[line[2]]= this.symbol2;
                check= true;
                break;
              }
              else if(this.squares[line[0]]==this.symbol2 && !this.squares[line[1]] && this.squares[line[2]]==this.symbol2){
                this.squares[line[1]]= this.symbol2;
                check= true;
                break;
              }
              else if(!this.squares[line[0]] && this.squares[line[1]]==this.symbol2 && this.squares[line[2]]==this.symbol2){
                this.squares[line[0]]= this.symbol2;
                check= true;
                break;
              }
            }
            if(!check){
              this.tryTie()
            }        
        }
        this.changeTurn();
        this.checkWinner();
      } 
    }
  }
}