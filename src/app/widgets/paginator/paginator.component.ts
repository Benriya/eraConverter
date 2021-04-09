import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ResponsiveService} from "../../services/responsive.service";

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, DoCheck {
  @Input() filteredPostsList;
  @Input() listRecordNumber;
  @Output() pageEmit = new EventEmitter<number>();
  page: number;
  pages = [];
  activePage = 1;
  pagination: string;
  listSize = 0;

  constructor(private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    this.page = 1;

    this.responsiveService.getMobileStatus().subscribe( isMobile =>{
      if(isMobile){
        this.pagination = 'pagination';
      }
      else{
        this.pagination = 'pagination pagination-lg';
      }
    });
    this.onResize();
  }

  onResize(){
    this.responsiveService.checkWidth();
  }

  ngDoCheck(): void {
    this.setPaginator();
  }

  nextPage(): void {
    this.page += 1;
    this.activePage += 1;
    this.pageEmit.emit(this.page);
  }

  prevPage(): void {
    this.page -= 1;
    this.activePage -= 1;
    this.pageEmit.emit(this.page);
  }

  switchPage(pageNumber: number): void {
    this.page = pageNumber;
    this.activePage = pageNumber;
    this.pageEmit.emit(this.page);
  }

  setPaginator(): void {
    this.pages = [];
    this.listSize = Math.ceil(this.filteredPostsList.length / this.listRecordNumber);
    // console.log(this.listSize);
    for (let i = 0; i < this.listSize; i++) {
      this.pages.push(i + 1);
    }
  }
}
