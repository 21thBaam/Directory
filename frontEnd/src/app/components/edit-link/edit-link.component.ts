import { Component, OnInit } from '@angular/core';
import { LinkModel } from "../../models/link-model";
import { FolderModel } from "../../models/folder-model";
import { LinksService } from "../../services/links.service";
import { FolderServiceService } from "../../services/folder-service.service";
import { Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.component.html',
  styleUrls: ['./edit-link.component.css']
})
export class EditLinkComponent implements OnInit {

  folderInfo: FolderModel[] = {} as FolderModel[];
  linkData: LinkModel = {} as LinkModel;

  constructor(private folderServiceService: FolderServiceService, private linksService: LinksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.linkData.idLinks = parseInt(params.get("idLink")); } );
    this.linksService.getLink(this.linkData.idLinks).subscribe(
      res => { this.linkData = res[0]; });
    this.folderServiceService.getFolders().subscribe(
      res => { this.folderInfo = res; });
  } 

  onSubmit(){
    
  }

}
