/**
 * External link detection adapted and modified from:
 * http://stackoverflow.com/questions/6238351/fastest-way-to-detect-external-urls#answer-28054735
 *
 * The main differences are that we don't consider alternate protocols
 * (such as mailto:/tel:) as external.
 */
let Zoolander = Zoolander || {};
(($, Zoolander, settings = { excludedExtlinkSelectors: [] }) => {
  Zoolander.extlink = Zoolander.extlink || {};

  Zoolander.extlink.checkDomain = function checkDomain(url) {
    let checkDomainUrl = url;
    if (checkDomainUrl.indexOf('//') === 0) { checkDomainUrl = window.location.protocol + checkDomainUrl; }
    return checkDomainUrl.toLowerCase().replace(/[a-z]*:\/\//, '').split('/')[0];
  };

  Zoolander.extlink.isExternal = function isExternal(url) {
    return ~url.indexOf('//') && Zoolander.extlink.checkDomain(window.location.href) !== Zoolander.extlink.checkDomain(url);
  };

  Zoolander.extlink.extLinkHandler = function extLinkHandler() {
    if (this.href && Zoolander.extlink.isExternal(this.href)) {
      this.className += ' extLink';
      // rel values addresses potential security concern as described here:
      // https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
      this.rel += ' noopener noreferrer';
      this.target = '_blank';
    }
  };

  // Add the extLink class to all external URLs.
  $(document).ready(() => {
    const excludedSelectors = settings.excludedExtlinkSelectors.join(',');
    $('.main-nav a, .footer-menu a, .external').filter(`:not(${excludedSelectors})`).each(Zoolander.extlink.extLinkHandler);
  });
})(jQuery, Zoolander);
