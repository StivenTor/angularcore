import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClientService } from "../infraestructure/http-client.service";
import { Observable } from "rxjs/Observable";
import { RouterService } from "../infraestructure/router.service";


@Injectable()
export class PersonRemoteService {


	constructor(private httpClient: HttpClientService) { }


	getPersons() {

		return Observable.create(observer => {
			const url =
			`${environment.SERVER_URL}/api/Person/getPersons`;

			this.httpClient.get(url, true).subscribe(
				(data: any) => {
					observer.next(data);
					observer.complete();
				}
				);
		});
	}


	savePerson(data) {

		return Observable.create(observer => {

			const body: any = {
				Name: data["name"],
				LastName: data["lastname"],
				Age: data["age"],
				Address: data["address"],
				Cellphone: data["cellphone"],
				Email: data["email"]
			};


			const url = environment.SERVER_URL + "/api/Person/savePerson";

			this.httpClient.post(url, body, false).subscribe((result: any) => {
				observer.next(result);
				observer.complete();
			}
			);
		});

	}



	updatePerson(data) {

		return Observable.create(observer => {

			const body: any = {
				Name: data["name"],
				LastName: data["lastname"],
				Age: data["age"],
				Address: data["address"],
				Cellphone: data["cellphone"],
				Email: data["email"],
				Id: data["id"]
			};


			const url = environment.SERVER_URL + "/api/Person/updatePerson";

			this.httpClient.post(url, body, false).subscribe((result: any) => {
				observer.next(result);
				observer.complete();
			}
			);
		});

	}



	deletePerson(data) {

		return Observable.create(observer => {

			const body: any = {
				Id: data["id"]
			};


			const url = environment.SERVER_URL + "/api/Person/deletePerson";

			this.httpClient.post(url, body, false).subscribe((result: any) => {
				observer.next(result);
				observer.complete();
			}
			);
		});

	}

}
