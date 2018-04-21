import { Element, h } from "./base/element";
import { Cell } from "../core/cell";
import { mouseMoveUp } from "./event"

export class Editorbar {
  el: Element;
  value: Cell | null = null; // 选中的当前的cell
  textarea: Element;
  label: Element;
  change: (v: Cell) => void = (v) => {};
  constructor () {
    this.el = h().class('spreadsheet-editor-bar').children([
      h().class('spreadsheet-formula-bar').children([
        this.label = h().class('spreadsheet-formula-label'),
        this.textarea = h('textarea').on('input', (evt) => this.input(evt))
      ]),
      // h().class('spreadsheet-formular-bar-resizer').on('mousedown', this.mousedown)
    ])
  }

  onChange (change: (v: Cell) => void) {
    this.change = change
  }

  set (title: string, value: Cell) {
    this.label.html(title)
    this.setValue(value)
  }

  setValue (value: Cell) {
    this.value = value
    this.textarea.val(value.text || '')
  }

  input (evt: any) {
    const v = evt.target.value
    if (this.value) {
      this.value['text'] = v
      this.change(this.value)
    }
  }

}