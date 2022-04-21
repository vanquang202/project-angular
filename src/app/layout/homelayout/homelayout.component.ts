import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.css'],
})
export class HomelayoutComponent implements OnInit {
  urlImage: any;
  listBg: any = [
    'https://tonghop.vn/wp-content/uploads/2020/06/maxresdefault.jpg',
    'https://dbk.vn/uploads/ckfinder/images/tin-tuc-1/Chill-la-gi-3.jpg',
    'https://media.2dep.vn/upload/thanhle/2021/12/16/chill-nghia-la-gi-tren-facebook-trao-luu-chill-cua-gioi-tre-1639639538-1.jpg',
    'https://tophinhanh.com/wp-content/uploads/2022/01/39_hinh-gif-anime-chill-gif-chill-dep-nhat-620x375.gif',
    'https://blogphanmem.vn/wp-content/uploads/2021/12/hinh-anh-chill-mot-minh-820x461-1.jpg',
    'https://i.makeagif.com/media/9-15-2021/aIBInu.gif',
    'https://i.makeagif.com/media/4-07-2021/Tp-LEb.gif',
    'https://tophinhanh.com/wp-content/uploads/2022/01/10_hinh-gif-anime-chill-gif-chill-dep-nhat.gif',
  ];
  user: any;
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private userS: UserService
  ) {}

  ngOnInit(): void {
    const user: any = localStorage.getItem('user');
    this.user = JSON.parse(user).user;
    this.urlImage = this.listBg[this.listBg.length - 3];
  }
  onPage(img: any): void {
    this.urlImage = img;
  }
  logout() {
    this.authService.signOut();
    const user: any = localStorage.getItem('user');
    this.userS.logout(JSON.parse(user)).subscribe(
      (data: any) => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      },
      (err: any) => {
        alert('Bạn không thể đăng xuất !');
      }
    );
  }
}
