import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <div class="loading">
            <img src="../../../assets/loading.svg" alt="loading">
        </div>
    `
})

export class CallbackComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
