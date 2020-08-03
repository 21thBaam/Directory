import { Component, OnInit } from '@angular/core';
import { LinkModel } from "../../models/link-model";
import { LinksService } from "../../services/links.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  links: LinkModel[] = [] as LinkModel[];
  idFolder: number;


  constructor(private linkService: LinksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
        this.idFolder = parseInt(params.get("idFolder")); } );

    this.linkService.getLinks(this.idFolder).subscribe(
      res => { this.links = res; },
      error => { console.log(error); } );
  }

}
