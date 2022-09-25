import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'details-general',
  templateUrl: './details-general.component.html',
  styleUrls: ['./details-general.component.css']
})
export class DetailsGeneralComponent implements OnInit {
  @Input() mediaType!: string;
  @Input() details!: Observable<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
