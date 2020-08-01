import { Component, OnInit } from '@angular/core';
import { FolderModel } from "../../models/folder-model";
import { FolderServiceService } from "../../services/folder-service.service";

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  constructor(private folderService: FolderServiceService) { }

  folders: FolderModel[] = [{}] as FolderModel[];

  ngOnInit(): void {
    this.folderService.getFolder().subscribe(
      res => {
        this.folders = res;
      },
      error => {
        console.log(error);
      });
  }
}
