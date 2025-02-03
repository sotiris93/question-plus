import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { LogInComponent } from "./log-in/log-in.component";
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
  selector: 'app-authentication',
  imports: [TabsModule, LogInComponent, SignUpComponent],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {


}
