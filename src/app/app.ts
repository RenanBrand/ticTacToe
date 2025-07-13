import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
   template: `
    <div id="statusArea" className="status">Next player: <span>{{currentPlayer}}</span></div>
    <div id="winnerArea" className="winner">Winner: <span>{{ winner ? winner : 'None'  }}</span></div>
    <button (click)="resetGame()">Reset</button>
    <section>
      <div class="row" *ngFor="let row of board; let rowIndex = index">
        <button *ngFor="let cell of row; let colIndex = index" class="square" style="width:40px;height:40px;"
        (click)="ticTacButton(rowIndex,colIndex)"> {{ board[rowIndex][colIndex] }}</button>
      </div>
    </section>
  `,
  styles: [`
  .square {
    width: 40px;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    border: 1px solid #999;
    background-color: #ddd;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
  }

  .square:focus {
    outline: none;
  }

  .row {
    display: flex;
  }

  .status, .winner {
    margin-bottom: 10px;
    font-family: Arial, sans-serif;
  }

  button {
    padding: 0;
    margin: 0;
  }
`]
})
export class App {
  protected readonly title = signal('ticTacToe');
   board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  currentPlayer = 'X';
  winner: string | null = null;

  // Function play game
  ticTacButton( row:any, col: any ){

    if (this.board[row][col] !== '' || this.winner) return;

    this.board[row][col] = this.currentPlayer;
    if (this.checkWinner()) {
      this.winner = `Jogador ${this.currentPlayer} venceu!`;
      return;
    }

    // Alterna entre X e O
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

   checkWinner(): boolean {
    const lines = [
      // Linhas
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      // Colunas
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      // Diagonais
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ];

    return lines.some(line => line.every(cell => cell === this.currentPlayer));
  }
  // Reset game
   resetGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.winner = null;
  }
}
