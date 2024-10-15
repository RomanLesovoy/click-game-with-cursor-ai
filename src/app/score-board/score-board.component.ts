import { Component, Inject, OnInit } from '@angular/core';
import { GameService } from '../../app/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="score-board">
      <div>Игрок: {{ playerScore }}</div>
      <div>Компьютер: {{ computerScore }}</div>
    </div>
  `,
  styles: [`
    .score-board {
      display: flex;
      justify-content: space-between;
      width: 300px;
      margin-bottom: 20px;
    }
  `]
})
export class ScoreBoardComponent implements OnInit {
  playerScore = 0;
  computerScore = 0;

  constructor(@Inject(GameService) private gameService: GameService) {}

  ngOnInit() {
    this.gameService.playerScore$.subscribe((score: number) => this.playerScore = score);
    this.gameService.computerScore$.subscribe((score: number) => this.computerScore = score);
  }
}
