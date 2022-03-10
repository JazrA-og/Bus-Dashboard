import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {
  Proxy,
  Business,
  Params_Get_Business_By_BUSINESS_ID,

} from '../../core/services/proxy.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CommonService } from '../../core/services/common.service';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Get_Business_By_BUSINESS_ID_Subscription = new Subscription();
  // searchModel: Params_Get_Business_By_BUSINESS_ID = new Params_Get_Business_By_BUSINESS_ID();
  data: Business= {} as Business;



  constructor(private proxy: Proxy,
    private CmSvc: CommonService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private saveCred: SaveCredentialsService
  ) { }

  ngOnInit(): void {


    this.fetchData();
  }
  ngOnDestroy(): void {
    // this.Get_Business_By_BUSINESS_ID_Subscription.unsubscribe();

  }
  fetchData() {
    // this.searchModel.BUSINESS_ID = this.saveCred.getBusinessID();
    // this.Get_Business_By_BUSINESS_ID_Subscription = this.proxy.Get_Business_By_BUSINESS_ID(this.searchModel).subscribe(result => {
    //   if (result != null) {
    //     this.data = result;
    //   }
    // });
  }

  Edit(current: Business) {
    current.BUSINESS_ID = -1;
    current.IS_VALIDATED = false;
    current.IS_ACTIVE = false;
    current.IS_CHECKMARK = false;
    current.IS_BOOSTED = false;
    this.proxy.Edit_Business(current).subscribe((result) => {
      if (result != null) {
        this.CmSvc.ShowMessage('Done');
        this.router.navigate(["login"]);
      }
    });
  }
  // Delete(entry: Business) {
  // const dialogRef = this.dialog.open(DeleteConfirmationComponent);
  // dialogRef.afterClosed().subscribe((response: any) =>  {
  // if (response) {
  // const _params_Delete_Business = new Params_Delete_Business();
  // _params_Delete_Business.BUSINESS_ID = entry.BUSINESS_ID;
  // this.proxy.Delete_Business(_params_Delete_Business).subscribe(data => {
  // if (data === '') {
  // this.data.splice(this.data.indexOf(entry), 1);
  // }
  // });
  //  }
  // });
  // }
  goBack() {
    this.location.back();
  }


}
