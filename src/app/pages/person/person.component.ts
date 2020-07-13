import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  AfterViewInit,
  HostListener
} from "@angular/core";
import { PersonService } from "../../services/person.service";
import { FormControl, FormGroup, Validators, FormArray } from "@angular/forms";
import {
  MatTableDataSource,
  MatPaginator,
  MatSnackBar
} from "@angular/material";
import { FormValidatorService } from "../../services/infrasetructure/form-validator.service";
import { AlertService } from "../../services/infraestructure/alert.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-person",
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.scss"]
})
export class PersonComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  public personTableDataSource = new MatTableDataSource<any>();
  public displayedColumns = [
  "id",
  "name",
  "lastname",
  "age",
  "email"  
  ];

  public showDialog = false;
  // public loading = true;
  public personForm: any;
  public model: any;
  public idPerson: string;
  public editReadOnly = false;
  currentCity ='';

  constructor(
    private personService: PersonService,
    private locationService: LocationService,
    private alertService: AlertService,
    private router: Router
    ) {
  }

  formSetup() {
    this.personForm = new FormGroup(
    {
      name: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      cellphone: new FormControl("", []),
      address: new FormControl("", []),
      neighborhood: new FormControl("", []),
      email: new FormControl("", [
        Validators.required,
        FormValidatorService.emailCheck()
        ]),
    });
  }

  loadData() {
    this.loadPersons();
  }

  loadPersons() {
    // this.usersTableDataSource.data = [];
    this.personService.getUsers().subscribe((result: any) => {
      this.personTableDataSource.data = result.data.items;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.personTableDataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.personTableDataSource.paginator = this.paginator;
  }

  ngOnInit() {
    // console.log(this.contextService.user);

    this.formSetup();
    this.loadData();
  }

  personFormSubmit(): void {
    // console.log(this.userForm);

    if (!this.personForm.valid) {
      return;
    }

    const dataForm = {
      userName: this.userForm.controls.username.value,
      codeTypeDocument: this.userForm.controls.doc_type.value,
      document: this.userForm.controls.doc_number.value,
      name: this.userForm.controls.name.value,
      email: this.userForm.controls.email.value,
      status: this.userForm.controls.status.value ? this.userForm.controls.status.value : false,
      uToken: this.userForm.controls.token.value ? this.userForm.controls.token.value : false,
      changePassword: false,
      viewBalance: this.userForm.controls.balance.value,
      collector: this.userForm.controls.collector.value,
      vendor: this.userForm.controls.vendor.value,
      distributor: false,
      commerce: false,
      token: this.contextService.tokenSession,
      clientId: this.contextService.token
    };

    const optionalData = {
      phone: this.userForm.controls.phone.value,
      cellPhone: this.userForm.controls.cellphone.value,
      codeCity: this.userForm.controls.codeCity.value,
      address: this.userForm.controls.address.value,
      suburb: this.userForm.controls.neighborhood.value,
      codeRole: this.userForm.controls.role.value,
      distributorCode: "0",
      commerceCode: "0"
    };

    if (this.idUser) {
      optionalData["id"] = this.idUser;
    }

    this.userService
    .saveUser(dataForm, optionalData)
    .subscribe((result: any) => {
      if (result.status) {
        this.loadUsers();

        this.alertService.info(result.data.message);
        this.showDialog = false;
      } else {
        this.alertService.error(result.data.message);
      }
    });
  }

  addPerson() {
    this.editReadOnly = false;
    this.idPerson = null;
    this.userForm.reset();
    this.showDialog = true;
  }

  editPerson(user, readOnly) {
    this.idPerson = user.usr_idUser;

    this.userForm.controls.username.setValue(user.usr_userName);
    this.userForm.controls.doc_type.setValue(user.usr_codeTypeDocument);
    this.userForm.controls.doc_number.setValue(user.usr_document);
    this.userForm.controls.name.setValue(user.usr_name);

    this.userForm.controls.codeCity.setValue(String(user.usr_codeCity));
    this.currentCity = user.usr_codeCity;

    if (user.usr_cellPhone == null || user.usr_cellPhone === "null") {
      this.userForm.controls.cellphone.setValue("");
    } else {
      this.userForm.controls.cellphone.setValue(user.usr_cellPhone);
    }

    if (user.usr_phone == null || user.usr_phone === "null") {
      this.userForm.controls.phone.setValue("");
    } else {
      this.userForm.controls.phone.setValue(user.usr_phone);
    }

    if (user.usr_suburb == null || user.usr_suburb === "null") {
      this.userForm.controls.neighborhood.setValue("");
    } else {
      this.userForm.controls.neighborhood.setValue(user.usr_suburb);
    }

    if (user.usr_adress == null || user.usr_adress === "null") {
      this.userForm.controls.address.setValue("");
    } else {
      this.userForm.controls.address.setValue(user.usr_adress);
    }

    this.userForm.controls.email.setValue(user.usr_email);
    this.userForm.controls.role.setValue(String(user.usr_codeRole));
    this.userForm.controls.token.setValue(user.usr_utoken);
    this.userForm.controls.status.setValue(user.usr_status);
    this.userForm.controls.balance.setValue(user.usr_viewBalance);
    this.userForm.controls.vendor.setValue(user.usr_vendor);
    this.userForm.controls.collector.setValue(user.usr_collector);

    

    this.showDialog = true;
    this.editReadOnly = readOnly;
  }

}