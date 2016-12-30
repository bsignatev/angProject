import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numToTime' })
export class NumToTime implements PipeTransform {
 
    transform(value: number): string {
        var hours = Math.floor(value / 60);
        var min =  value % 60;        
        return `${hours}h ${min}m`;
    }
}