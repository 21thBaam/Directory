import { Component, OnInit, Input } from '@angular/core';
import { FolderModel } from "../../models/folder-model";
import { FolderServiceService } from "../../services/folder-service.service";
import { ActivatedRoute, Router, ParamMap} from "@angular/router";

declare var Swal: any;
declare var $: any;

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  constructor(private folderService: FolderServiceService, private router: Router, private route: ActivatedRoute){ }

  folders: FolderModel[] = [{}] as FolderModel[];
  searchText: string;

  ngOnInit(): void {
    this.folderService.getFolders().subscribe(
      res => { this.folders = res; },
      error => { console.log(error); });
    this.getValue();
  }

  getValue(){
    $("#searchBar").keyup( (res) => {
      if(res){
        this.searchText = (<HTMLInputElement>document.getElementById("searchBar")).value;
      }
    });
  }

  edit(idFolder: number){
    this.router.navigate(["editFolder"], {queryParams: {idFolder: idFolder}});
  }

  delete(folder){
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
        this.folderService.deleteFolder(folder).subscribe(
          res => {
            this.ngOnInit();
            Swal.fire(
              'Deleted!',
              'Your folder has been deleted.',
              'success'
            );
          },
          error => { console.log(error); });
      }
    });
  }
}
