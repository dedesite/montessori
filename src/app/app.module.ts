import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphemeService } from './grapheme.service';
import { MakeDraggableDirective } from './makedraggable.directive';
import { MakeDroppableDirective } from './makedroppable.directive';

@NgModule({
  declarations: [
    AppComponent,
    MakeDraggableDirective,
    MakeDroppableDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [GraphemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
