import {Injectable} from "@angular/core";
import {ResponsiveService} from "./responsive.service";
import {map} from "rxjs/operators";
import {EraServiceService} from "./era-service.service";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class GlobalService {

  constructor(private responsiveService: ResponsiveService, private eraService: EraServiceService, private authService: AuthService) {}


  filteredListOptionsEra(filteredPostsList, searchOption, eraDatas): any[] {
    filteredPostsList = [];
    for (const post of eraDatas) {
      if (post.name.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.age.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.income.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.income.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.cost.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.possessions.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.description.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.source.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.id.toString().includes(searchOption.toLowerCase())) {
        filteredPostsList.push(post);
      }
    }
    return filteredPostsList;
  }

  filteredListOptionsCurrency(filteredPostsList, searchOption, eraDatas): any[] {
    filteredPostsList = [];
    for (const post of eraDatas) {
      if (post.currencyOne.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.currencyTwo.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.rate.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.id.toString().includes(searchOption.toLowerCase())) {
        filteredPostsList.push(post);
      }
    }
    return filteredPostsList;
  }

  checkIfMobile(selector, textLine) {
    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        selector = 'mobileSelector';
        textLine = 'mobileTextLine';
      }
      else{
        selector = '';
        textLine = '';
      }
    });
    this.onResize();
  }

  onResize(){
    this.responsiveService.checkWidth();
  }

  getEraData(eraDatas) {
    this.eraService.getEraData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          eraDatas.push(data[key]);
        }
      }
      return eraDatas;
    })).subscribe();
  }

  getCurrencyData(currencyDatas) {
    this.eraService.getCurrencyData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          currencyDatas.push(data[key]);
        }
      }
      return currencyDatas;
    })).subscribe();
  }

  getSuggestedEraData(suggestDatas) {
    this.eraService.getSuggestedEraData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          suggestDatas.push(data[key]);
        }
      }
      return suggestDatas;
    })).subscribe();
  }

  getSuggestedCurrData(suggestDatas) {
    this.eraService.getSuggestedCurrencyData().pipe(map((data: any) => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          suggestDatas.push(data[key]);
        }
      }
      return suggestDatas;
    })).subscribe();
  }

  updateData(modifiedData, dataArray) {
    for (let i = 0; i < dataArray.length; i++) {
      if (+modifiedData.id === +dataArray[i].id){
        dataArray[i] = modifiedData;
        return dataArray;
      }
    }
  }

  deleteData(deleteData, suggestedData): void {
    if (this.authService.isAuthenticated()) {
      const index = suggestedData.indexOf(deleteData, 0);
      suggestedData.splice(index, 1);
      this.eraService.suggestEraData(suggestedData).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }
}
