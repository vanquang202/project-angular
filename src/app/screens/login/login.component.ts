import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: SocialAuthService,private router: Router , private user : UserService) { }

  ngOnInit(): void {
    if(this.middlewareLogin()) this.router.navigate(['/']);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(data => {
        this.user.login(data).subscribe(
          (data : any) => {
              localStorage.setItem('user',JSON.stringify(data.payload));
              this.router.navigate(['/']);
          },
          (err : any ) => {
            alert(err.payload);
          }
        );

      })
  }

  middlewareLogin(){
      return localStorage.getItem('user')
  }

}
