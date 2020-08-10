import { Component, OnInit } from '@angular/core';
import { FolderServiceService } from "../../services/folder-service.service";
import { FolderModel } from "../../models/folder-model";
import { Router, ActivatedRoute } from '@angular/router';

declare var Swal: any;

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.css']
})
export class EditFolderComponent implements OnInit {

  constructor(private folderService: FolderServiceService, private route: ActivatedRoute, private router: Router) { }

  idFolder: number;
  folderData: FolderModel = {} as FolderModel;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.idFolder = parseInt(params.get("idFolder")); } );

    this.folderService.getFolder(this.idFolder).subscribe(
      res => { this.folderData = res[0]; },
      error => { console.log(error); });
  }


  onSubmit(){
    this.folderService.editFolder(this.folderData).subscribe(
      res => { this.doneMessage(); },
      error => { console.log(error); });
  }

  doneMessage(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Changes has been saved',
      showConfirmButton: false,
      timer: 1500
    }).then( res => {
      this.router.navigate(["/folders"], {relativeTo: this.route});
    });
  }

}
