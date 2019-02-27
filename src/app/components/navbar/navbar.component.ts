import { Component, OnInit, Input } from '@angular/core';
import { Auth2Service } from 'src/app/core/auth2.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['../../app.component.sass']
})
export class NavbarComponent {

    @Input() profile: any;

    constructor(private authService: Auth2Service) {}

    setActive(linkIndex: number): void {
        const prevElement = document.querySelector('.active');
        if (prevElement) {
            prevElement.classList.remove('active');
        }
        document.querySelector('button').click();
        const activeLink = <HTMLElement>document.querySelectorAll('.nav-item')[linkIndex];
        activeLink.classList.add('active');
    }

}
