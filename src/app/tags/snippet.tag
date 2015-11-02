<snippet>
  <div class="editor" onblur="{ contentChanged }" contenteditable="true"><yield /></div>
  <script>
    fluxableTag(this, RiotControl);
    var self = this;

    this.contentChanged = function(event) {
      RiotControl.trigger(constants.ACTIONS.SNIPPET_CHANGED, {name: opts.id, body: event.target.innerHTML});
    }
  </script>
  <style scoped>
    .editor {
      box-shadow: 0px 0px 2px #ccc;
    }

    .editor::after {
      position: absolute;
      top: 0px;
      right: 0px;

      /* Corner */
      content: '';
      width: 20px;
      height: 20px;
      background: #ccc none repeat scroll 0% 0%;
      border-radius: 0px 0px 0px 20px;
    }
  </style>
</snippet>
