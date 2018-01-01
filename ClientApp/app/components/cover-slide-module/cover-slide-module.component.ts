import { Component, OnInit, Inject, PLATFORM_ID, ElementRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ORIGIN_URL } from '@nguniversal/aspnetcore-engine';
import { ActivatedRoute } from '@angular/router'

declare var $: any;

@Component({
  selector: 'app-cover-slide-module',
  templateUrl: './cover-slide-module.component.html',
  styleUrls: ['./cover-slide-module.component.scss']
})
export class CoverSlideModuleComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(ORIGIN_URL) public baseUrl: string,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private elementRef: ElementRef) { }

  urls: any = {
    "base": `${this.baseUrl}`,
    "socialNetworks": {
      "faceBook": "https://www.facebook.com/GetTaxSolutions.Tax.Refund/",
      "twitter": "https://twitter.com/GetTaxSolution",
      "gPlus": "https://business.google.com/b/109044652006131958539/dashboard",
      "linkedIn": "https://www.linkedin.com/in/gettaxsolutions-corp-146804122?trk=nav_responsive_tab_profile",
      "tumblr": "https://gettaxsolutions.tumblr.com"
    },
    "aboutUs": "/about-us",
    "aboutUsMsg": "about-us",
    "ourFees": "/tax-refundable/our-fees",
    "ourFeesMsg": "Check Our Fees Section for more details",
    "termAndConditions": "/tax-back/term-and-conditions",
    "termAndConditionsMsg": "GetTaxSolutions Terms and Conditions",
    "docManagementPolicy": "/tax-back/doc-management-policy",
    "docManagementPolicyMsg": "GetTaxSolutions  Documents Management Policy",
    "privacyPolicy": "/tax-refund/privacy-policy",
    "privacyPolicyMsg": "GetTaxSolutions  Privacy  Policy",
    "cookiesPolicy": "/tax-refund/cookies-policy",
    "cookiesPolicyMsg": "GetTaxSolutions  Cookies  Policy",
    "account": {
      "login": "/login",
      "register": "/register"
    },
    "footer": "#footer",
    "services": {
      "profile": {
        "all": "/refundable-taxes/services",
        "allMsg": "Check our Australian & New Zealand Tax Refund Solutions",
        "au": "/refundable-taxes/services/australia",
        "auMsg": "Our Australian Tax Refund Services – Australian Tax return, Superannuation refund, TFN and ABN",
        "nz": "/refundable-taxes/services/new-zealand",
        "nzMsg": "Our New Zealand Tax Refund Services – New Zealand Tax return & IRD Number assistance"
      },
      "australian": {
        "itr": {
          "url": "/refund/australia/income-tax-return-itr",
          "form": "/support-form",
          "msg": "Free Estimation if you are due a tax Refund from Australia",
          "faq": "/faq"
        },
        "superannuation": {
          "url": "/refund/australia/superannuation",
          "form": "/support-form",
          "msg": "Australian Superannuation Refund Application",
          "faq": "/faq"
        },

        "tfn": {
          "url": "/refund/australia/tax-file-number-tfn",
          "form": "/support-form",
          "msg": "Apply for Tax File Number with us.",
          "faq": "/faq"
        },

        "abn": {
          "url": "/refund/australia/business-number-abn",
          "form": "/support-form",
          "msg": "Apply for ABN with us",
          "faq": "/faq"
        }
      },
      "newZeanland": {
        "itr": {
          "url": "/refund/new-zealand/income-tax-return-itr",
          "form": "/support-form",
          "msg": "Free Estimation if you are due a New Zealand Tax Refund",
          "faq": "/faq"
        },
        "ird": {
          "url": "/refund/new-zealand/ird-number",
          "form": "/support-form",
          "msg": "Apply for IRD Number with us",
          "faq": "/faq"
        }
      }
    }
  };

  ngOnInit() {

  }


  ngAfterViewInit() {
    try {
      if (isPlatformBrowser(this.platformId)) {
        var revapi: any;
        revapi = $('.fullwidthbanner').revolution({

          delay: 9000,
          startwidth: 1140,
          startheight: 450,
          hideThumbs: 200,

          thumbWidth: 100,
          thumbHeight: 50,
          thumbAmount: 3,

          navigationType: "none",
          navigationArrows: "solo",
          navigationStyle: "round",

          touchenabled: "on",
          onHoverStop: "on",

          navigationHAlign: "center",
          navigationVAlign: "bottom",
          navigationHOffset: 0,
          navigationVOffset: 20,

          soloArrowLeftHalign: "left",
          soloArrowLeftValign: "center",
          soloArrowLeftHOffset: 20,
          soloArrowLeftVOffset: 0,

          soloArrowRightHalign: "right",
          soloArrowRightValign: "center",
          soloArrowRightHOffset: 20,
          soloArrowRightVOffset: 0,

          shadow: 0,
          fullWidth: "on",
          fullScreen: "off",
          lazyLoad: "on",

          stopLoop: "off",
          stopAfterLoops: -1,
          stopAtSlide: -1,

          shuffle: "off",

          hideSliderAtLimit: 0,
          hideCaptionAtLimit: 0,
          hideAllCaptionAtLilmit: 0,
          startWithSlide: 0
        });
      }
    } catch (e) { alert('Error'); }
  }
}
