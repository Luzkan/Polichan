import {Component, OnInit} from '@angular/core';
import {RouteCategoryId} from '../../navigation/route-category-id.model';
import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';

interface NavbarData {
  translationKey: string,
  routerLink: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends AbstractCleanable implements OnInit {
  links: NavbarData[] = [];

  ngOnInit(): void {
    this.initLinks();
  }


  private initLinks(): void {
    const routeCategoryIds = Object.values(RouteCategoryId);
    const categoryLinks = this.prepareCategoryLinks(routeCategoryIds);
    const customLinks = this.prepareCustomLinks();
    this.links = [...customLinks, ...categoryLinks];
  }

  private prepareCategoryLinks(routeCategoryIds: string[]) {
    return routeCategoryIds.map((id) => this.createNavbarDataForId(id));
  }

  private prepareCustomLinks() {
    return [
      {
        translationKey: 'Header.Navbar.Item.Poli',
        routerLink: '/main',
      },
      {
        translationKey: 'Header.Navbar.Item.Random',
        routerLink: '/random',
      },
    ];
  }

  private createNavbarDataForId(id: string): NavbarData {
    const key = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();
    return {
      routerLink: `/category/${id}`,
      translationKey: `Header.Navbar.Item.${key}`,
    };
  }
}
