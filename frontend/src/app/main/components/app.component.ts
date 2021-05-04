import {Component} from '@angular/core';
import {PRIMARY_SPINNER_NAME} from '../../core/spinner/spinner-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'notice-board';
  spinnerName = PRIMARY_SPINNER_NAME;
}
