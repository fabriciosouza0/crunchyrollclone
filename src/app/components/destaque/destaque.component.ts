import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-destaque',
  templateUrl: './destaque.component.html',
  styleUrls: ['./destaque.component.css']
})
export class DestaqueComponent implements OnInit {
  @Input() emphasisImg!: string;
  @Input() emphasisTitle!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
