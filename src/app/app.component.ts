import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  AfterViewInit,
  ChangeDetectionStrategy,
  HostListener
} from "@angular/core";
import { LoadingService } from "./services/infraestructure/loading.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSidenav } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'pruebanetcore';

  @ViewChild("sidenav") sidenav: MatSidenav;


  navMode = "side";

  navOpened = true;

  message;  


  ngOnInit() {
    LoadingService.isLoading = false;
  }

  ngAfterViewInit() {

  }

  public isLoading() {
    return LoadingService.isLoading;
  }

  public menuOpenedOnInit() {
    // console.log("menuOpenedOnInit");
    return false;
  }


}
