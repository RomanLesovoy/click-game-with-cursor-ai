import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface Cell {
  x: number;
  y: number;
  color: 'blue' | 'yellow' | 'green' | 'red';
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private boardSize = 10;
  private board: Cell[][] = [];
  private gameOver = new Subject<void>();
  private playerScore = new BehaviorSubject<number>(0);
  private computerScore = new BehaviorSubject<number>(0);
  private activeCell: Cell | null = null;
  private timeLimit = 1000;
  private timer: any;

  boardState = new BehaviorSubject<Cell[][]>([]);
  playerScore$ = this.playerScore.asObservable();
  computerScore$ = this.computerScore.asObservable();

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    this.board = Array(this.boardSize).fill(null).map((_, y) =>
      Array(this.boardSize).fill(null).map((_, x) => ({ x, y, color: 'blue' }))
    );
    this.boardState.next(this.board);
  }

  startGame(timeLimit: number) {
    this.timeLimit = timeLimit;
    this.playerScore.next(0);
    this.computerScore.next(0);
    this.initializeBoard();
    this.nextRound();
  }

  private nextRound() {
    if (this.playerScore.value >= 10 || this.computerScore.value >= 10) {
      this.gameOver.next();
      return;
    }

    if (this.timer) {
      clearTimeout(this.timer);
    }

    const x = Math.floor(Math.random() * this.boardSize);
    const y = Math.floor(Math.random() * this.boardSize);
    this.activeCell = this.board[y][x];
    this.activeCell.color = 'yellow';
    this.boardState.next(this.board);

    this.timer = setTimeout(() => {
      if (this.activeCell && this.activeCell.color === 'yellow') {
        this.activeCell.color = 'red';
        this.computerScore.next(this.computerScore.value + 1);
        this.boardState.next(this.board);
        this.nextRound();
      }
    }, this.timeLimit);
  }

  cellClicked(cell: Cell) {
    if (cell === this.activeCell && cell.color === 'yellow') {
      cell.color = 'green';
      this.playerScore.next(this.playerScore.value + 1);
      this.boardState.next(this.board);
      clearTimeout(this.timer);
      this.nextRound();
    }
  }
}
