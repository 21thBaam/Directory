import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".toast").toast("show");
    });
  }

}
