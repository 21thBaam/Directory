import { Component, OnInit } from '@angular/core';
import { FolderModel } from "../../models/folder-model";
import { LinkModel } from "../../models/link-model";
import { LinksService } from "../../services/links.service";
import { FolderServiceService } from "../../services/folder-service.service";
import { Router } from "@angular/router";
import {NgForm} from '@angular/forms';

declare var Swal: any;

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.css']
})
export class AddFolderComponent implements OnInit {

  constructor(private folderServiceService: FolderServiceService, private linksService: LinksService, private router: Router) { }

  folderData: FolderModel = {} as FolderModel;
  folderInfo: FolderModel[] = [] as FolderModel[];
  linkData: LinkModel = {} as LinkModel;

  ngOnInit(): void {
    this.folderServiceService.getFolders().subscribe(
      res => { this.folderInfo = res; },
      error => { console.log(error); });
  }

  addFolder(folderAdd: NgForm){
    if (this.validatorFolderName()) {
      this.folderServiceService.addFolder(this.folderData).subscribe(
        res => {
          this.done();
          this.restartForm(folderAdd);
        },
        erro => {
          console.log(erro);
        });
    }
  }

  addLink(linkAdd: NgForm){
    this.linksService.addLink(this.linkData).subscribe(
      res => {
      this.done();
      this.restartForm(linkAdd);},
      erro => {
        console.log(erro);
      });
  }

  done(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }

  restartForm(form: NgForm){
    form.resetForm();
  }

  validatorFolderName(){
    var temp = (<HTMLInputElement>document.getElementById("nameFolder")).value;
    for(let name in this.folderInfo){
      if(temp.toLowerCase() == this.folderInfo[name]["folderName"].toLowerCase()){
        document.getElementById("existFN").innerHTML = "That folder name already exist";
        document.getElementById("existFN").style.display = ""; 
        return false;
      }else{
        document.getElementById("existFN").style.display = "none"; 
      }
    }
    return true;
  }
}
