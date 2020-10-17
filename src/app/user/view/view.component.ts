import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  @Input() emp: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.emp);
  }

}
