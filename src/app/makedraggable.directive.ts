import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[makeDraggable]'
})
/**
 * Adaptation of Mithun Patel work
 * https://github.com/mithun-daa/ng2_dnd
 */
export class MakeDraggableDirective {
  @Input('makeDraggable') data: any;

  constructor(el: ElementRef) {
    let nativeEl = el.nativeElement;

    nativeEl.draggable = 'true';
    // Set up the dragstart event and add the drag-src CSS class
    // to change the visual appearance. Set the current todo as the data
    // payload by stringifying the object first
    nativeEl.addEventListener('dragstart', (e) => {
      nativeEl.classList.add('drag-src')
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text', JSON.stringify(this.data));
    });

    // Remove the drag-src class
    nativeEl.addEventListener('dragend', (e) => {
      e.preventDefault();
      nativeEl.classList.remove('drag-src')
    });
  }
}
