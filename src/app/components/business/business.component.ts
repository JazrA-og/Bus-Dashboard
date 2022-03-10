import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {
  Proxy,
  Business,
  Params_Get_Business_By_BUSINESS_ID,
  Params_Delete_Business,
  Params_Get_Work_area_By_OWNER_ID,
  Params_Delete_Work_list_By_BUSINESS_ID,
  Params_Get_Work_list_By_BUSINESS_ID,
  Work_list,
  Work_area,
  Params_Delete_User_By_USERNAME,

} from '../../core/services/proxy.service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CommonService } from '../../core/services/common.service';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit, OnDestroy {
  Get_Business_By_BUSINESS_ID_Subscription = new Subscription();
  searchModel: Params_Get_Business_By_BUSINESS_ID = new Params_Get_Business_By_BUSINESS_ID();
  data!: Business;

  workAreaList: Work_area[] = [];
  params_Get_Work_area_By_OWNER_ID = new Params_Get_Work_area_By_OWNER_ID();
  Get_Work_area_By_OWNER_ID_Subscription = new Subscription();

  workList: Work_list[] = [];
  i_Params_Delete_Work_list_By_BUSINESS_ID = new Params_Delete_Work_list_By_BUSINESS_ID();
  i_Params_Get_Work_list_By_BUSINESS_ID = new Params_Get_Work_list_By_BUSINESS_ID();
  Get_Work_list_By_BUSINESS_ID_Subscription = new Subscription();
  Delete_Work_list_By_BUSINESS_ID_Subscription = new Subscription();
  Edit_Work_list_Subscription = new Subscription();

  i_Params_Delete_User_By_USERNAME: Params_Delete_User_By_USERNAME = new Params_Delete_User_By_USERNAME();
  Delete_User_By_USERNAME_Subscription = new Subscription();


  constructor(private proxy: Proxy,
    private CmSvc: CommonService,
    private dialog: MatDialog,
    private location: Location,
    private saveCred: SaveCredentialsService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.i_Params_Get_Work_list_By_BUSINESS_ID.BUSINESS_ID = this.saveCred.getBusinessID();


    this.fetchData();
  }

  ngOnDestroy(): void {
    this.Get_Business_By_BUSINESS_ID_Subscription.unsubscribe();
    this.Get_Work_area_By_OWNER_ID_Subscription.unsubscribe();
    this.Get_Work_list_By_BUSINESS_ID_Subscription.unsubscribe();
    this.Delete_Work_list_By_BUSINESS_ID_Subscription.unsubscribe();
  }

  fetchData() {
    this.searchModel.BUSINESS_ID = this.saveCred.getBusinessID();
    this.Get_Business_By_BUSINESS_ID_Subscription = this.proxy.Get_Business_By_BUSINESS_ID(this.searchModel).subscribe(result => {
      if (result != null) {
        this.data = result;
      }
    });

    this.fetchWorkList();
  }

  Edit(current: Business) {
    this.proxy.Edit_Business(current).subscribe((result) => {
      if (result != null) {
        this.CmSvc.ShowMessage('Done');
      }
    });
  }

  Delete(entry: Business) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        const _params_Delete_Business = new Params_Delete_Business();
        _params_Delete_Business.BUSINESS_ID = entry.BUSINESS_ID;
        this.proxy.Delete_Business(_params_Delete_Business).subscribe(data => {
          this.i_Params_Delete_User_By_USERNAME.USERNAME = entry.USERNAME;
          this.Delete_User_By_USERNAME_Subscription = this.proxy.Delete_User_By_USERNAME(this.i_Params_Delete_User_By_USERNAME).subscribe(
            (e) => {
              this.goLogin()
            }
          );
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }



  clearBusinessWorkList(businessID: any) {
    this.i_Params_Delete_Work_list_By_BUSINESS_ID.BUSINESS_ID = businessID;
    this.Delete_Work_list_By_BUSINESS_ID_Subscription = this.proxy.Delete_Work_list_By_BUSINESS_ID(this.i_Params_Delete_Work_list_By_BUSINESS_ID).subscribe(
      (result) => {
        if (result != null) {

        }
      }
    )
  }

  editBusinessWorkList() {
    this.clearBusinessWorkList(this.saveCred.getBusinessID);
    this.workList.forEach((element) => {
      this.Edit_Work_list_Subscription = this.proxy.Edit_Work_list(element).subscribe(
        (result) => {
          if (result != null) {
            this.CmSvc.ShowMessage("Done");
            // console.log('Done');

          }
        }
      )
    })
  }

  addItemToWorkList(item: Work_area) {
    this.workAreaList.push(item);
  }

  clearWorkList() {
    this.workList = [];
  }

  goLogin() {
    this.router.navigate(
      ['/login'],
    );
  }

  fetchWorkList() {
    this.params_Get_Work_area_By_OWNER_ID.OWNER_ID = 1;
    this.Get_Work_area_By_OWNER_ID_Subscription = this.proxy.Get_Work_area_By_OWNER_ID(this.params_Get_Work_area_By_OWNER_ID).subscribe(
      (result) => {
        if (result != null) {
          this.workAreaList = result;
        }
      }
    )

    this.Get_Work_list_By_BUSINESS_ID_Subscription = this.proxy.Get_Work_list_By_BUSINESS_ID_Adv(this.i_Params_Get_Work_list_By_BUSINESS_ID).subscribe(
      (e) => {
        if (e != null) {
          this.workList = e;
        }
      }
    )


  }

  onSaveCheckBox() {
    this.workList.forEach((element) => {
      this.Edit_Work_list_Subscription = this.proxy.Edit_Work_list(element).subscribe(
        (res) => {

        }
      )
    })
    this.CmSvc.ShowMessage("Done");
    // console.log(this.workAreaList);
  }

  changeCheckBox(event: any) {
    // console.log("Item"+item);
    // console.log("Event" + event);

  }
}
