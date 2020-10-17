import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private router: Router) { }

  login(username: string, password: string) {
     const user = {username, password};
     if (username === 'admin@agileinfoways.com' && password === '123456'){
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/user']);
      return true;
    }
    else{
      return false;
    }
  }

    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

    isLogin(){
     const user =  JSON.parse(localStorage.getItem('user'));
     if (user){
       return true;
     }
     else{
      return false;
     }
    }
}
