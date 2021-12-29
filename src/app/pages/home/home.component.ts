import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    // this.loadingService.loading$.subscribe((isLoadingKey) => {
    //   this.isLoading = isLoadingKey;
    //   console.log(isLoadingKey);
    // });
  }
}
