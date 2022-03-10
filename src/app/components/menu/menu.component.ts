import { Component, OnInit } from '@angular/core';
import { menumodel } from '../../core/Models/menumodel';
import { Router } from '@angular/router';
import { SaveCredentialsService } from 'src/app/core/services/save-credentials.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  entries: menumodel[] = [];
  constructor(private router: Router,private saveCred: SaveCredentialsService) { }

  MenuHandler(m: menumodel) {
    const NavArray = [];
    NavArray.push(m.route);
    this.router.navigate(NavArray);
  }

  ngOnInit() {
    let m = new menumodel();

    m = new menumodel();
    m.fa_icon = 'fas fa-briefcase';
    m.title = 'Business';
    m.route = 'business';
    this.entries.push(m);

    m = new menumodel();
    m.fa_icon = 'fas fa-calendar-week';
    m.title = 'Booking';
    m.route = 'booking';
    this.entries.push(m);

    // m = new menumodel();
    // m.fa_icon = 'fas fa-dollar-sign';
    // m.title = 'Boost Pricing';
    // m.route = 'boost-pricing';
    // this.entries.push(m);

    m = new menumodel();
    m.fa_icon = 'fas fa-file-invoice-dollar';
    m.title = 'Boost Listing';
    m.route = 'boost-listing';
    this.entries.push(m);

    m = new menumodel();
    m.fa_icon = 'far fa-cog';
    m.title = 'Service';
    m.route = 'service-prod';
    this.entries.push(m);

    // m = new menumodel();
    // m.fa_icon = 'fas fa-comment-dots';
    // m.title = 'Feedback';
    // m.route = 'feedback';
    // this.entries.push(m);

    // m = new menumodel();
    // m.fa_icon = 'fas fa-receipt';
    // m.title = 'Invoices';
    // m.route = 'invoices';
    // this.entries.push(m);

  }
}
