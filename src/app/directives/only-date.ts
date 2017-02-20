import { Directive, ElementRef, HostListener, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[only-date]'
})
export class OnlyDateDirective {
    inputRegex: RegExp = /[0-9]|\./;
    constructor(private el: ElementRef) {
        this.el = el;
    }

    @HostListener('keypress', ['$event']) onKeyPress($event) {
        let key = $event.keyCode || $event.which;
        key = String.fromCharCode(key);
        let oldValue = this.el.nativeElement.value;
        let inputPosition = this.el.nativeElement.selectionStart;
        let value;
        if (!this.inputRegex.test(key)) {
            $event.preventDefault();
        } else {
            value = this.getNewValue(oldValue, key, inputPosition)
            if (!this.checkValue(value)) {
                $event.preventDefault();
            }
        }
    }

    @HostListener('paste', ['$event']) onPaste($event) {
        let inputPosition = this.el.nativeElement.selectionStart;
        let oldValue = this.el.nativeElement.value;
        let inputValue = $event.clipboardData.getData('Text');
        if (!this.inputRegex.test(inputValue)) {
            $event.preventDefault();
        }
        let newValue = this.getNewValue(oldValue, inputValue, inputPosition);
        if (!this.checkValue(newValue)) {
            return false;
        }
    }

    getNewValue(oldValue, inputKey, inputPosition) {
        return oldValue.substring(0, inputPosition) + inputKey + oldValue.substring(inputPosition);
    }

    checkValue(value) {
        let arr = value.split(".");
        if (arr.length > 3) return false;
        if (parseInt(arr[0]) > 31) return false;
        if (parseInt(arr[1]) > 12) return false;
        if (parseInt(arr[2]) > 9999) return false;
        return true;
    }
}