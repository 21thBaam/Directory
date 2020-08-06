import { Component, OnInit } from '@angular/core';
import { LinkModel } from "../../models/link-model";
import { LinksService } from "../../services/links.service";
import { ActivatedRoute, Router, ParamMap} from "@angular/router";

declare var Swal: any;

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  links: LinkModel[] = [] as LinkModel[];
  idFolder: number;


  constructor(private linkService: LinksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
        this.idFolder = parseInt(params.get("idFolder")); } );

    this.linkService.getLinks(this.idFolder).subscribe(
      res => { this.links = res; },
      error => { console.log(error); } );
  }

  edit(idLink: number){
    this.router.navigate(["editLink"], {queryParams: {idLinks: idLink}});
  }

  delete(link: LinkModel){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.linkService.deleteLink(link).subscribe(
          res => {
            this.ngOnInit();
            Swal.fire(
              'Deleted!',
              'Your link has been deleted.',
              'success'
            );
          },
          error => { console.log(error); });
      }
    });
  }

  openLinks(URL: string){
    window.open(URL);
  }
}
