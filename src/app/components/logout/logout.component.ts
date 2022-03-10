import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../core/services/common.service';
import { Router } from '@angular/router';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private CmSvc: CommonService, private router: Router,private saveCred: SaveCredentialsService) { }

  ngOnInit() {
  }

  ClickHandler() {
    this.CmSvc.Is_Logged_In.next(false);
    this.saveCred.clearCredentials();
    this.router.navigate(['/Login']);
  }

}
