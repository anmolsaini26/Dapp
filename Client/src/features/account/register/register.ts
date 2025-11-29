import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
 protected creds = {} as RegisterCreds;
 membersFromHome = input.required<User[]>();
 cancelRegister = output<boolean>();
 private accountService = inject(AccountService);
 



 register() {
  this.accountService.register(this.creds).subscribe({
    next: result => {
      console.log(result);
      this.cancel();
    },
    error: error => console.log(error)
  })
   
 }
 cancel() {
  console.log('registration cancelled');
  this.cancelRegister.emit(false);
 }
}
