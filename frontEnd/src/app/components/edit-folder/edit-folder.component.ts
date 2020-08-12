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

  idFolder: String;
  folderData: FolderModel = {} as FolderModel;
  folderInfo: FolderModel[] = [] as FolderModel[];
  currentFolderName: String;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.idFolder = params.get("idFolder"); } );

    this.folderService.getFolder(this.idFolder).subscribe(
      res => { 
        this.folderData = res[0]; 
        this.currentFolderName = this.folderData.folderName;
      },
      error => { console.log(error); });

    this.folderService.getFolders().subscribe(
      res => { this.folderInfo = res;},
      error => { console.log(error); });
  }

  onSubmit(){
    if(this.validatorFolderName()){
      this.folderService.editFolder(this.folderData, this.currentFolderName).subscribe(
        res => { this.doneMessage(); },
        error => { console.log(error); });
    }
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

  validatorFolderName(){
    var temp = (<HTMLInputElement>document.getElementById("nameFolder")).value;
    for(let name in this.folderInfo){
      if(temp.toLowerCase() == this.folderInfo[name]["folderName"].toLowerCase() && temp.toLowerCase() != this.currentFolderName.toLowerCase()){
        document.getElementById("existFN").innerHTML = "That folder name already exist";
        document.getElementById("existFN").style.display = ""; 
        return true;
      }else{
        document.getElementById("existFN").style.display = "none"; 
      }
    }
    return true;
  }

}
