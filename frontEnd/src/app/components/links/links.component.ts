import { Component, OnInit } from '@angular/core';
import { LinkModel } from "../../models/link-model";
import { LinksService } from "../../services/links.service";
import { ActivatedRoute, Router, ParamMap} from "@angular/router";
import {CdkDragDrop, copyArrayItem} from '@angular/cdk/drag-drop';

declare var Swal: any;
declare var $: any;

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  links: LinkModel[] = [] as LinkModel[];
  filteredLinks: LinkModel[] = [] as LinkModel[];
  idFolder: String;
  searchText: string;
  selectedLink = [];

  constructor(private linkService: LinksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
        this.idFolder = params.get("idFolder"); } );

    this.linkService.getLinks(this.idFolder).subscribe(
      res => { this.links = res; this.filteredLinks = res;},
      error => { console.log(error); } );

    this.getValue();
  }

  edit(idLink: String){
    this.router.navigate(["editLink"], {queryParams: {idLinks: idLink}});
  }

  getValue(){
    $("#searchBar").keyup( (res) => {
      if(res){
        this.searchText = (<HTMLInputElement>document.getElementById("searchBar")).value;
        this.filterLinks();
      }
    });
  }

  filterLinks(){
    this.filteredLinks = [] as LinkModel[];
    for(let link in this.links){
      if(this.links[link].title.toLowerCase().includes(this.searchText.toLowerCase())){
        this.filteredLinks.push(this.links[link]);
      }
    }
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

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer !== event.container) {
      if(this.selectedLink.length == 0){
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }

  deleteSelectedLink(){
    this.selectedLink = [];
  }

  dragMessage(){
    if(this.selectedLink.length == 0){
      return true;
    }else{
      return false;
    }
  }
}
