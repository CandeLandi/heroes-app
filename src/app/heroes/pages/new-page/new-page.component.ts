import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.scss'
})
export class NewPageComponent {


  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ]
}
