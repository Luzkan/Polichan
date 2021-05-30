import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ImageComponent {
  @Input()
  imgUrl: String | undefined

  showModal: boolean = false;
  show() {
    this.showModal = true;
  }
  hide() {
    this.showModal = false;
  }

  onScroll(event: any): void {
    if (event.target.localName !== 'img') return;
    event.preventDefault();

    const targetStyle = event.target.parentNode.parentNode.style;

    const scalePattern = /scale\([0-9|.]*\)/;
    const parenthesesPattern = /\(([^)]+)\)/;

    const matches = targetStyle.transform.match(scalePattern);
    let scaleValue = parseFloat(matches[0].match(parenthesesPattern)[1]);

    if (event.deltaY < 0) {
      scaleValue += 0.1;
      targetStyle.transform = targetStyle.transform.replace(scalePattern, 'scale(' + scaleValue + ')');
    } else {
      scaleValue -= 0.1;
      if (scaleValue < 0.2) scaleValue = 0.2;
      targetStyle.transform = targetStyle.transform.replace(scalePattern, 'scale(' + scaleValue + ')');
    }
  }
}
