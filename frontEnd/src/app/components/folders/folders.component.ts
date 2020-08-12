import { Component, OnInit, Input } from '@angular/core';
import { FolderModel } from "../../models/folder-model";
import { FolderServiceService } from "../../services/folder-service.service";
import { ActivatedRoute, Router, ParamMap} from "@angular/router";
import {CdkDragDrop, copyArrayItem} from '@angular/cdk/drag-drop';

declare var Swal: any;
declare var $: any;

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  constructor(private folderService: FolderServiceService, private router: Router, private route: ActivatedRoute){ }

  folders: FolderModel[] = [] as FolderModel[];
  filteredFolders: FolderModel[] = [] as FolderModel[];
  searchText: string;
  selectedFolder = [];

  ngOnInit(): void {
    this.folderService.getFolders().subscribe(
      res => { this.folders = res; this.filteredFolders = res;},
      error => { console.log(error); });
    this.getValue();
  }

  getValue(){
    $("#searchBar").keyup( (res) => {
      if(res){
        this.searchText = (<HTMLInputElement>document.getElementById("searchBar")).value;
        this.filterFolders();
      }
    });
  }

  filterFolders(){
    this.filteredFolders = [] as FolderModel[];
    for(let folder in this.folders){
      if(this.folders[folder].folderName.toLowerCase().includes(this.searchText.toLowerCase())){
        this.filteredFolders.push(this.folders[folder]);
      }
    }
  }

  edit(idFolder: String){
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

  drop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer !== event.container) {
      if(this.selectedFolder.length == 0){
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }

  deleteSelectedFolder(){
    this.selectedFolder = [];
  }

  dragMessage(){
    if(this.selectedFolder.length == 0){
      return true;
    }else{
      return false;
    }
  }
}
