import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { Player } from './player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  players: Player[] = [];
  newPlayer: Player = {
    name: '',
    dateOfBirth: new Date(),
    battingStyle: '',
    bowlingStyle: '',
    nationality: '',
  };
  selectedPlayer: Player | null = null;

  constructor(private playerService: PlayerService) {
    this.getPlayers();
  }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService
      .getPlayers()
      .subscribe((players) => (this.players = players));
  }

  addPlayer(): void {
    this.playerService.addPlayer(this.newPlayer).subscribe(() => {
      this.getPlayers();
      this.newPlayer = {
        name: '',
        dateOfBirth: new Date(),
        battingStyle: '',
        bowlingStyle: '',
        nationality: '',
      };
    });
  }

  updatePlayer(player: Player) {
    if (player._id) {
      this.playerService.updatePlayer(player._id, player).subscribe(
        (updatedPlayer) => {
          const index = this.players.findIndex(
            (p) => p._id === updatedPlayer._id
          );
          if (index !== -1) {
            this.players[index] = updatedPlayer;
          }
        },
        (error) => {
          console.error('Error updating player:', error);
        }
      );
    }
  }

  deletePlayer(playerId: string): void {
    this.playerService
      .deletePlayer(playerId)
      .subscribe(() => this.getPlayers());
  }
}
