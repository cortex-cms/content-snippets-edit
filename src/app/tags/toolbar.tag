<toolbar class="cortex-scope">
  <div class="toolbar-fixed">
    <button class="waves-effect waves-light btn green" onclick="{saveWebpage}">Save</button>
    <button class="waves-effect waves-light btn blue" onclick="{preview}">Preview</button>
    <button class="waves-effect waves-light btn red" onclick="{cancel}">Cancel</button>
  </div>

  <script>
    fluxableTag(this, RiotControl);
    this.saveWebpage = function() {
      RiotControl.trigger(constants.ACTIONS.SAVE_WEBPAGE);
    };
    this.cancel = function() {
      parent.postMessage({event: constants.FRAME_ACTIONS.CANCEL_EDITOR}, '*');
    };
    this.preview = function() {
      $('.editor').removeClass('editor');
    }
  </script>

  <style scoped>
    :scope {
      display: block;
      height: 2.5em;
    }

    .toolbar-fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 2.5em;
      z-index: 9999999;
      width: 100%;
      background-color: #fff;
    }
  </style>
</toolbar>
