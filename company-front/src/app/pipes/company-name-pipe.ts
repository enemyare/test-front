import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyName'
})
export class CompanyNamePipe implements PipeTransform {
  transform(suffix: string, name: string): string {
    if (!name || !suffix) return '';
    return `${suffix} "${name}"`;
  }
}
