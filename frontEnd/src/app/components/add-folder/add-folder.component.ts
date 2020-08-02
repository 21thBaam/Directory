import { Component, OnInit } from '@angular/core';
import { FolderModel } from "../../models/folder-model";
import { LinkModel } from "../../models/link-model";
import { LinksService } from "../../services/links.service";
import { FolderServiceService } from "../../services/folder-service.service";

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.css']
})
export class AddFolderComponent implements OnInit {

  constructor(private folderServiceService: FolderServiceService) { }

  folderData: FolderModel = {} as FolderModel;
  folderInfo: FolderModel[] = {} as FolderModel[];
  linkData: LinkModel = {} as LinkModel;

  ngOnInit(): void {
    this.folderServiceService.getFolders().subscribe(
      res => { this.folderInfo = res; },
      error => { console.log(error); });
  }

}
