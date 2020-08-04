import { Component, OnInit } from '@angular/core';
import { FolderServiceService } from "../../services/folder-service.service";
import { FolderModel } from "../../models/folder-model";
import { Router, ActivatedRoute } from '@angular/router';

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
      res => { this.folderData = res[0]; console.log(this.folderData); },
      error => { console.log(error); });
  }


  onSubmit(){
    this.folderService.editFolder(this.folderData).subscribe(
      res => { this.router.navigate(["/folders"], {relativeTo: this.route}); },
      error => { console.log(error); });
  }

}
