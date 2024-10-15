import { Component, OnInit, Inject } from '@angular/core';
import { GameService } from '../../app/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal" *ngIf="showModal">
      <div class="modal-content">
        <h2>Игра окончена!</h2>
        <p>{{ result }}</p>
        <button (click)="closeModal()">Закрыть</button>
      </div>
    </div>
  `,
  styles: [`
    .modal {
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.4);
    }
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 400px;
      text-align: center;
    }
  `]
})
export class ModalComponent implements OnInit {
  showModal = false;
  result = '';

  constructor(@Inject(GameService) private gameService: GameService) {}

  ngOnInit() {
    this.gameService.playerScore$.subscribe((playerScore: number) => {
      if (playerScore >= 10) {
        this.showModal = true;
        this.result = 'Вы победили!';
      }
    });

    this.gameService.computerScore$.subscribe((computerScore: number) => {
      if (computerScore >= 10) {
        this.showModal = true;
        this.result = 'Компьютер победил!';
      }
    });
  }

  closeModal() {
    this.showModal = false;
  }
}
