import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { PersonRemoteService } from "./remote/person-remote.service";


@Injectable()
export class PersonService {


	constructor(private http: HttpClient,
		private router: Router,
		private personRemoteService: PersonRemoteService) {

	}


	getPersons() {
		return Observable.create(observer => {
			this.personRemoteService.getPersons().subscribe(
				data => {
					observer.next(data);
					observer.complete();
				}
				);
		});
	}


	savePerson(data) {
		return Observable.create(observer => {

			this.personRemoteService.savePerson(data).subscribe(
				response => {
					observer.next(response);
					observer.complete();
					}
				);

		});
	}


	updatePerson(data) {
		return Observable.create(observer => {

			this.personRemoteService.updatePerson(data).subscribe(
				response => {
					observer.next(response);
					observer.complete();
					}
				);

		});
	}


	deletePerson(data) {
		return Observable.create(observer => {
			this.personRemoteService.deletePerson(data).subscribe(
				response => {
					observer.next(response);
					observer.complete();
					}
				);

		});
	}

} 