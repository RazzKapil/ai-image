import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from './chat/chat.component'; // Import ChatComponent

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatComponent], // Add ChatComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fix typo: styleUrl -> styleUrls
})
export class AppComponent {
  title = 'ai-chat-app';
}