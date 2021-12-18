import { Component, OnInit } from '@angular/core';
import { ErrorService } from './services/error/error.service';
import { LoadingService } from './services/loading/loading.service';
import { AlertService } from './services/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  isAlert: boolean = false;
  isError: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private errorService: ErrorService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadingService.loading$.subscribe((isLoadingKey) => {
      this.isLoading = isLoadingKey;
    });

    this.errorService.isError$.subscribe((isErrorKey) => {
      this.isError = isErrorKey;
      if (this.isError) {
        console.log('hay un error');
      }
    });
  }
}
