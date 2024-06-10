import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiGatewayConfiguration {
  rootUrl: string = 'https://api.algonexus.online';
}
