import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public symbol: string;
  public squares: string[];
  public turn: string;
  public random:number[];

  constructor() {
    this.turn= 'player1'
    this.symbol= '';
    this.squares= Array(9).fill(null);
    this.random=[0,1,2,3,4,5,6,7,8]
  }

  show(pos){
    if(this.turn == 'player1'){
      if(!this.squares[pos]){
        this.squares.splice(pos,1,'X')
        let rand = this.random[Math.floor(Math.random() * this.random.length)]
        this.squares.splice(rand,1,'O')
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