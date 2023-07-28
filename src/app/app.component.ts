import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent  {

constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.setFlagIcons();
  }

  private setFlagIcons() {
    const listOfIcons: string[] = ['en', 'de', 'fr', 'es'];
    listOfIcons.forEach(icon => {
      this.matIconRegistry.addSvgIcon
      (icon, this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/' + icon + '.svg')
      );
    });
  }
}
