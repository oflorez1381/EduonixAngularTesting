import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() question: any;
  @Input() form: FormGroup;
  @Input() objectToFill: any;

  @ViewChild('input') input: TemplateRef<any>;
  @ViewChild('checkbox') checkbox: TemplateRef<any>;
  @ViewChild('empty') empty: TemplateRef<any>;
  @ViewChild('select') select: TemplateRef<any>;


  constructor() { }

  ngOnInit() {
  }

  resolveTemplate(question) {
    if (question == null) { return this.empty; }

    const templateName: string = question.type;
    return {
      input: this.input,
      checkbox: this.checkbox,
      select: this.select
    }[templateName];
  }

}
