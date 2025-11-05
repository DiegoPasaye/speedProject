import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEnvelope, heroLockClosed } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ heroEnvelope, heroLockClosed })],
})
export class Login {

}
