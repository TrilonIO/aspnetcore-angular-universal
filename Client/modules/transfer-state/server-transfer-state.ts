import { Injectable, Optional, RendererFactory2, ViewEncapsulation, Inject, PLATFORM_ID } from '@angular/core';
import { TransferState } from './transfer-state';
import { PlatformState } from '@angular/platform-server';
@Injectable()
export class ServerTransferState extends TransferState {
  constructor(private state: PlatformState, private rendererFactory: RendererFactory2) {
    super();
  }

  /**
   * Inject the State into the bottom of the <head>
   */
  inject() {
    try {
      const document: any = this.state.getDocument();
      const transferStateString = JSON.stringify(this.toJson());
      const renderer = this.rendererFactory.createRenderer(document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });

      const body = document.body;

      const script = renderer.createElement('script');
      renderer.setValue(script, `window['TRANSFER_STATE'] = ${transferStateString}`);
      renderer.appendChild(body, script);
    } catch (e) {
      console.log('Failed to append TRANSFER_STATE to body');
      console.error(e);
    }
  }


}
