import { Component, Inject } from '@angular/core';
import { GameService } from '../../app/game.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="game-controls">
      <input type="number" [(ngModel)]="timeLimit" placeholder="Время (мс)">
      <button (click)="startGame()">Начать</button>
    </div>
  `,
  styles: [`
    .game-controls {
      margin-top: 20px;
    }
    input, button {
      margin-right: 10px;
    }
  `]
})
export class GameControlsComponent {
  timeLimit = 1000;

  constructor(@Inject(GameService) private gameService: GameService) {}

  startGame() {
    this.gameService.startGame(this.timeLimit);
  }
}
