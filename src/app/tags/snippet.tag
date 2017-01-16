<snippet>
  <div id="{ opts.id }" class="editor" onblur="{ contentChanged }" contenteditable="true"><yield /></div>

  <script>
    fluxableTag(this, RiotControl);
    var self = this;

    RiotControl.on(constants.ACTIONS.WEBPAGE_CHANGED, function(webpage) {
      var foundSnippet = _.find(webpage.snippets, function(obj) {
        return obj.document.name == opts.id;
      });
      if (typeof foundSnippet != "undefined") {
        CKEDITOR.instances[opts.id].setData(foundSnippet.document.body);
      }
    });

    this.contentChanged = function(event) {
      var body = CKEDITOR.instances[opts.id].getData();
      RiotControl.trigger(constants.ACTIONS.SNIPPET_CHANGED, {name: opts.id, body: body});
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
