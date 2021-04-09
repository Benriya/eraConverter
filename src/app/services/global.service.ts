import {Injectable} from "@angular/core";
import {ResponsiveService} from "./responsive.service";

@Injectable({providedIn: 'root'})
export class GlobalService {

  constructor(private responsiveService: ResponsiveService) {}


  filteredListOptions(filteredPostsList, searchOption, eraDatas): any[] {
    filteredPostsList = [];
    for (const post of eraDatas) {
      if (post.name.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.age.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.income.toLowerCase().includes(searchOption.toLowerCase()) ||
        post.age.toLowerCase().includes(searchOption.toLowerCase()) ||
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
}
