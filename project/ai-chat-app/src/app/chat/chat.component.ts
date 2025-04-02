import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClient, HttpClientModule } from '@angular/common/http'; // Import HttpClient and HttpClientModule

@Component({
  selector: 'app-chat',
  standalone: true, // Ensure this is a standalone component
  imports: [FormsModule, CommonModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  input: string = ''; // Bind this to ngModel
  messages: { role: string; text: string }[] = [];
  loading: boolean = false;

  // Array to store previous chats
  previousChats: { title: string; messages: { role: string; text: string }[] }[] = [];

  constructor(private http: HttpClient) {} // Inject HttpClient

  sendMessage() {
    if (this.input.trim()) {
      // Add the user's message to the chat
      this.messages.push({ role: 'user', text: this.input });
      const userMessage = this.input; // Save the input for the API call
      this.input = ''; // Clear the input field
      this.loading = true;

      // Make a POST request to the backend API
      this.http.post<{ response: string }>('https://localhost:5000/chat', { message: userMessage })
        .subscribe({
          next: (response) => {
            // Add the AI's response to the chat
            this.messages.push({ role: 'ai', text: response.response });
            this.loading = false;
          },
          error: (err) => {
            // Handle errors
            console.error('Error:', err);
            this.messages.push({ role: 'ai', text: 'Sorry, something went wrong. Please try again.' });
            this.loading = false;
          }
        });
    }
  }

  // Save the current chat to the previous chats list
  saveChat() {
    if (this.messages.length > 0) {
      const chatTitle = `Chat ${this.previousChats.length + 1}`;
      this.previousChats.push({ title: chatTitle, messages: [...this.messages] });
      this.messages = []; // Clear the current chat
    }
  }

  // Load a previous chat
  loadChat(chat: { title: string; messages: { role: string; text: string }[] }) {
    this.messages = [...chat.messages];
  }
}