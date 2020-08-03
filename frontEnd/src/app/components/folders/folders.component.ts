import { Component, OnInit } from '@angular/core';
import { FolderModel } from "../../models/folder-model";
import { FolderServiceService } from "../../services/folder-service.service";
import { ActivatedRoute, Router, ParamMap} from "@angular/router";

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  constructor(private folderService: FolderServiceService, private router: Router, private route: ActivatedRoute){ }

  folders: FolderModel[] = [{}] as FolderModel[];

  ngOnInit(): void {
    this.folderService.getFolders().subscribe(
      res => { this.folders = res; },
      error => { console.log(error); });
  }

  edit(idFolder: number){
    this.router.navigate(["editFolder"], {queryParams: {idFolder: idFolder}});
  }

  delete(folder){
    this.folderService.deleteFolder(folder).subscribe(
      res => { this.ngOnInit(); },
      error => { console.log(error); });
  }
}
