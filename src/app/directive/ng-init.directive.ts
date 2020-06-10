import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appNgInit]'
})
export class NgInitDirective {

  @Input() ngInit;

  constructor() { }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    // this.ngInit;
  }

}
