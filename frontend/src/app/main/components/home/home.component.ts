import {Component, OnInit} from '@angular/core';
import {ThreadService} from '../../services/thread.service';
import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';
import {Thread} from '../../models/thread.model';
import {Observable} from 'rxjs';
import {Optional} from '../../../core/types/optional.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AbstractCleanable implements OnInit {
  threads: Optional<Observable<Thread[]>>;

  static BOARD_TITLES = {
    '*': '',
    'poli': '/poli/ - Politechnika',
    'uni': '/uni/ - Uniwersytet',
    'random': '/random/ - Tematy Przeróżne',
    'it': '/it/ - Programowanie i Informatyka',
    'math': '/math/ - Matematyka i Cyferki',
    'med': '/med/ - Medycyna i Lekarskie',
    'bio': '/bio/ - Biologia i Natura',
    'chem': '/chem/ - Chemia i Mieszadełka',
    'phys': '/phys/ - Fizyka i Astronomia',
    'elec': '/elec/ - Elektryka i Elektronika',
    'bud': '/bud/ - Budowa',
    'arch': '/arch/ - Architektura',
    'mech': '/mech/ - Mechanika',
  }

  constructor(private readonly threadService: ThreadService) {
    super();
  }

  ngOnInit(): void {
    this.threads = this.threadService.getThreads();
  }
}
