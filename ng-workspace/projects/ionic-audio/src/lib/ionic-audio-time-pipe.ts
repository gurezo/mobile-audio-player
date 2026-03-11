import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'audioTime' })
export class AudioTimePipe implements PipeTransform {
  transform(value?: number): string {
    if (value === undefined || Number.isNaN(value)) return '';
    const s = Math.trunc(value % 60);
    const m = Math.trunc((value / 60) % 60);
    const h = Math.trunc(((value / 60) / 60) % 60);
    return h > 0
      ? `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
      : `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
  }
}

