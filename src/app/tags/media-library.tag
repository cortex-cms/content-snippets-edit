<media-library class="cortex-scope">
  <div id="media-library-modal" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4 class="left-align">Insert Media</h4>
      <input placeholder="Search Media..." type="text" name="search" onkeyup={ mediasSearch }>

      <ul class="collection">
        <li class="collection-item avatar hoverable" each={ medias }>
          <div class="s12 m2">
            <a if={ thumbs } href="{ url }" target="_blank">
              <img src="{ thumbs.mini }" alt="Thumbnail" class="circle">
            </a>
            <i if={ !thumbs } class="material-icons circle green">perm_media</i>
          </div>

          <span class="title">{ name }</span>
          <p>{ attachment_file_name }</p>
          <p><strong>Author: </strong>{ creator.fullname }</p>
          <p><strong>Description: </strong>{ description }</p>
          <p><strong>Tags: </strong>
              <span each={ tag in tag_list }>
                <a href="#" onclick={ parent.mediasSearch(tag) }>{ tag }</a>
              </span>
          </p>

          <div class="secondary-content">
            <p><strong>Created: </strong> { created_at }</p>
            <p><strong>Last Modified: </strong> { updated_at }</p>
            <p><strong>UID: </strong>{ taxon }</p>

            <p>
              <button class="btn red" type="button" disabled><i class="material-icons">delete</i> Delete</button>
              <button class="btn" type="button" onclick={ parent.insertMedia }>
                <i class="material-icons">library_add</i> Insert
              </button>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="modal-footer">
      <ul class="pagination">
        <li class="waves-effect"><a href="#!" onclick={ mediasPrevious }><i class="material-icons">chevron_left</i></a></li>
        <li class="waves-effect"><a href="#!" onclick={ mediasNext }><i class="material-icons">chevron_right</i></a></li>
      </ul>

      <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  </div>

  <style scoped>
    .collection-item {
      min-height: 115px !important;
    }
  </style>

  <script>
    fluxableTag(this, RiotControl);
    this.medias = [];
    var self = this;

    RiotControl.on(constants.ACTIONS.MEDIAS_CHANGED, function(medias) {
      self.medias = medias;
      self.update();
    });

    insertMedia(e) {
      window.media_select_defer.resolve(e.item);
    }

    mediasNext(e) {
      RiotControl.trigger(constants.ACTIONS.MEDIAS_NEXT);
    }

    mediasPrevious(e) {
      RiotControl.trigger(constants.ACTIONS.MEDIAS_PREVIOUS);
    }

    mediasSearch(e) {
    }
  </script>
</media-library>
