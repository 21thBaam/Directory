import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

declare var $: any;

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  data: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    $(document).ready(() => {
      $(".toast").toast("show");
    });

    this.authService.getUsers().subscribe(
      res => {
        this.data = res;
        console.log(this.data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
