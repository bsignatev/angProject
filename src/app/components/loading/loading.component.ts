import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from "../../services"

@Component({
    selector: 'loading-indicator',
    styleUrls: ['./loading.component.css'],
    templateUrl: './loading.component.html',
})

export class LoadingIndicator implements OnInit, OnDestroy {
    private isLoading = false;
    private subscription: any;

    constructor(private loadingService: LoadingService) {
    }

    ngOnInit() {
        this.subscription = this.loadingService.loading.subscribe(loading => this.displayIndicator(loading));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    displayIndicator(loading) {
        this.isLoading = loading
    }
}