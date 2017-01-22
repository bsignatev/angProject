import {Directive, ElementRef, HostListener, OnInit, OnDestroy} from '@angular/core';

@Directive({
    selector: '[only-date]'
})
export class OnlyDateDirective implements OnInit, OnDestroy {
    constructor(private el:ElementRef) {
    }

    @HostListener('keypress', ['$event']) onKeyPress($event) {
        var key = $event.keyCode || $event.which;
        key = String.fromCharCode(key);
        //this.el.nativeElement.value
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            $event.preventDefault();
        }
    }

    ngOnInit() {
        //this.el.nativeElement.addEventListener('keypress', this.onKeyPress);
    }

    ngOnDestroy() {
        //this.el.nativeElement.removeEventListener('keypress', this.onKeyPress);
    }
}