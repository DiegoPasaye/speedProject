import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEnvelope, heroLockClosed, heroUser } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
    imports: [NgIconComponent],
  providers: [provideIcons({ heroEnvelope, heroLockClosed, heroUser })],

})
export class Register {

}
