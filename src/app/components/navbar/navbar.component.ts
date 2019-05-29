import { Component, OnInit, Input } from '@angular/core';
import { Auth2Service } from 'src/app/core/auth2.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['../../app.component.sass']
})
export class NavbarComponent {

    @Input() profile: any;

    constructor(public authService: Auth2Service) { }


}
