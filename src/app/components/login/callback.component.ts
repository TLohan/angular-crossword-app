import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `
        <div class="loading">
            <img src="../../../assets/loading.svg" alt="loading">
        </div>
    `
})

export class CallbackComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
        this.router.navigate(['/']);
     }
}
