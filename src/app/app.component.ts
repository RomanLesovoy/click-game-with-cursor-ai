import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, GameBoardComponent, ScoreBoardComponent, GameControlsComponent, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'click-game';
}
