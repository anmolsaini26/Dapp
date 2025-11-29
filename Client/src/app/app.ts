import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{

  private http = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members = signal<User[]>([])
  public accountService = inject(AccountService);

  ngOnInit(): void {
    this.http.get<User[]>('https://localhost:5001/api/member').subscribe({
      next: response => this.members.set(response),
      error: error => console.log(error),
      complete: () => console.log('Request completed')    
     })

     this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if(userString) {
      const user = JSON.parse(userString);
      this.accountService.currentUser.set(user);
    }
  }
}
