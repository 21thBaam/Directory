import { Component, OnInit } from '@angular/core';
import { LinkModel } from "../../models/link-model";
import { FolderModel } from "../../models/folder-model";
import { LinksService } from "../../services/links.service";
import { FolderServiceService } from "../../services/folder-service.service";
import { Router, ActivatedRoute} from "@angular/router";

declare var Swal: any;

@Component({
  selector: 'app-edit-link',
  templateUrl: './edit-link.component.html',
  styleUrls: ['./edit-link.component.css']
})
export class EditLinkComponent implements OnInit {

  folderInfo: FolderModel[] = [] as FolderModel[];
  lastFolder: number;
  linkData: LinkModel = {} as LinkModel;

  constructor(private folderServiceService: FolderServiceService, private linksService: LinksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Params
    this.route.queryParamMap.subscribe((params) => {
      this.linkData.idLinks = parseInt(params.get("idLinks")); } );
    //Link Data
    this.linksService.getLink(this.linkData.idLinks).subscribe(
      res => { this.linkData = res[0]; this.lastFolder = this.linkData.idFolder; });
    //Folders Data
    this.folderServiceService.getFolders().subscribe(
      res => { this.folderInfo = res; });
  } 

  onSubmit(){
    this.linksService.updateLink(this.linkData).subscribe(
      res => { this.doneMessage(); });
  }

  doneMessage(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Changes has been saved',
      showConfirmButton: false,
      timer: 1500
    }).then( res => {
      this.router.navigate(["/links"],
      {queryParams: {idFolder: this.lastFolder}, relativeTo: this.route});
    });
  }
}
