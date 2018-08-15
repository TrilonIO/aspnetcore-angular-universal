/* 
 * -- LinkService --        [Temporary]
 * @MarkPieszak
 * 
 * Similar to Meta service but made to handle <link> creation for SEO purposes
 * Soon there will be an overall HeadService within Angular that handles Meta/Link everything
 */

import { isPlatformServer } from '@angular/common';
import {
  Inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
  ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class LinkService {
  private isServer: boolean = isPlatformServer(this.platform_id);

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platform_id
  ) {}

  /**
   * Inject the State into the bottom of the <head>
   */
  addTag(tag: LinkDefinition, forceCreation?: boolean) {
    try {
      const renderer = this.rendererFactory.createRenderer(this.document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });

      const link = renderer.createElement('link');
      const head = this.document.head;
      const selector = this._parseSelector(tag);

      if (head === null) {
        throw new Error('<head> not found within DOCUMENT.');
      }

      Object.keys(tag).forEach((prop: string) => {
        return renderer.setAttribute(link, prop, tag[prop]);
      });

      // [TODO]: get them to update the existing one (if it exists) ?
      renderer.appendChild(head, link);
    } catch (e) {
      console.error('Error within linkService : ', e);
    }
  }

  // updateTag(tag: LinkDefinition, selector?: string) {
  //     if (!tag) return null;
  //     selector = selector || this._parseSelector(tag);
  //     const meta = this.getTag(selector);
  //     if (meta) {
  //         return this._setMetaElementAttributes(tag, meta);
  //     }
  //     return this._getOrCreateElement(tag, true);
  // }

  // getTag(attrSelector: string): HTMLMetaElement {
  //     if (!attrSelector) return null;
  //     return this._dom.querySelector(this._doc, `meta[${attrSelector}]`);
  // }

  private _parseSelector(tag: LinkDefinition): string {
    // Possibly re-work this
    const attr: string = tag.rel ? 'rel' : 'hreflang';
    return `${attr}="${tag[attr]}"`;
  }
}

export declare type LinkDefinition = {
  charset?: string;
  crossorigin?: string;
  href?: string;
  hreflang?: string;
  media?: string;
  rel?: string;
  rev?: string;
  sizes?: string;
  target?: string;
  type?: string;
} & {
  [prop: string]: string;
};
