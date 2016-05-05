(function (global) {
  'use strict';

  var getMediaHtml = function (media) {
    // must use setAttribute for non-standard attributes
    var getImageMediaElement = function (media) {
        var image = document.createElement('img');
        image.src = media.url;
        image.alt = media.name;

        return image;
      },
      getYoutubeMediaElement = function (media) {
        var youtube = document.createElement('iframe');
        youtube.setAttribute('type', 'text/html');
        youtube.src = 'http://www.youtube.com/embed/' + media.video_id + '?rel=0&amp;enablejsapi=1controls=1&amp;showinfo=0&amp;wmode=transparent';
        youtube.setAttribute('frameborder', '0');
        youtube.style.position = 'absolute';
        youtube.style.top = '0';
        youtube.style.left = '0';
        youtube.width = '100%';
        youtube.height = '100%';

        var fluidYoutubeWrap = document.createElement('div');
        fluidYoutubeWrap.className = 'video--fluid';
        fluidYoutubeWrap.style.height = '0';
        fluidYoutubeWrap.style.maxWidth = '100%';
        fluidYoutubeWrap.style.position = 'relative';
        fluidYoutubeWrap.style.paddingBottom = '56.25%';
        fluidYoutubeWrap.style.overflow = 'hidden';

        fluidYoutubeWrap.appendChild(youtube);

        return fluidYoutubeWrap;
      },
      getPdfMediaElement = function (media) {
        var pdf = document.createElement('a');
        pdf.href = media.url;
        pdf.innerHTML = media.name;

        return pdf;
      },
      mediaElement;

    switch (media.content_type) {
      case 'image':
        mediaElement = getImageMediaElement(media);
        break;
      case 'youtube':
        mediaElement = getYoutubeMediaElement(media);
        break;
      case 'pdf':
        mediaElement = getPdfMediaElement(media);
        break;
    }

    mediaElement.setAttribute('data-media-id', media.id);
    return mediaElement.outerHTML;
  };

  global.utility = {
    currentEditor: {},
    mediaLibraryModal: {},
    insertMedia: function (media) {
      this.currentEditor.insertHtml(getMediaHtml(media));
      this.mediaLibraryModal.closeModal();
    },
    getMediaHtml: getMediaHtml
  };
}(this));
