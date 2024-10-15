import { Component, Inject, OnInit } from '@angular/core';
import { GameService, Cell } from '../../app/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-board">
      <div *ngFor="let row of board" class="row">
        <div *ngFor="let cell of row" 
             class="cell" 
             [ngClass]="cell.color"
             (click)="onCellClick(cell)">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-board {
      display: inline-grid;
      grid-template-columns: repeat(10, 30px);
      gap: 2px;
    }
    .cell {
      width: 30px;
      height: 30px;
      cursor: pointer;
      margin-bottom: 2px;
    }
    .blue { background-color: blue; }
    .yellow { background-color: yellow; }
    .green { background-color: green; }
    .red { background-color: red; }
  `]
})
export class GameBoardComponent implements OnInit {
  board: Cell[][] = [];

  constructor(@Inject(GameService) private gameService: GameService) {}

  ngOnInit() {
    this.gameService.boardState.subscribe((board: Cell[][]) => this.board = board);
  }

  onCellClick(cell: Cell) {
    this.gameService.cellClicked(cell);
  }
}
