<template>
  <div>
	<h2 class="display-2"> {{ $route.params.id }} </h2>
  <v-faicon name="brands/vuejs"  />

<v-container>
  <h3> Fake Data </h3>
  <template v-for="(block, i) in fakedata.blocks">
    

      <DynamicComponent
        :componentName="block.type"
        :data="block.data"
        :key="i + block.type"
      />
    
  </template>
</v-container>
  <!-- Editor JS -->
  <div class="editorx_body">
    <!--editorjs id-->
    <no-ssr placeholder="Loading Editor...">
    <div id="codex-editor"/>
    <button style="margin-left: 30%;" type="button" name="button" @click="save()">save</button>
    <div class="editorx_body">
      <pre>{{value}}</pre>
    </div>
  </no-ssr>
  </div>

</div>
</template>

<script>
  
  if(!process.server) {
	var EditorJS = require("@editorjs/editorjs");
  var Header = require("@editorjs/header");
  var Paragraph = require("@editorjs/paragraph");
  var List = require("@editorjs/list");
  var Warning = require("@editorjs/warning");
  var Embed = require('@editorjs/embed');
  var CodeTool = require('@editorjs/code');
  //var Image = require("@editorjs/image");
  //var SimpleImage = require("@editorjs/simple-image");
  var Marker = require('@editorjs/marker');
  var InlineCode = require('@editorjs/inline-code');
  //var RawTool = require('@editorjs/raw');
}
  // only import the icons you use to reduce bundle size
  import 'vue-awesome/icons/brands/vuejs'

	export default {
		name: 'Test-id',
    components: {
      DynamicComponent: () => import('~/components/blocks/template/DynamicComponent')

    },
		data: () => ({
      editor: null,
      value: null,
      fakedata: {
        "time": 1560277113016,
        "blocks": [
          {
            "type": "header",
            "data": {
              "text": "ini title 1",
              "level": 1
            }
          },
          {
            "type": "header",
            "data": {
              "text": "header with <a href=\"http://vuejs.org\">link</a>",
              "level": 2
            }
          },
          {
            "type": "list",
            "data": {
              "style": "unordered",
              "items": [
                "list",
                "list",
                "list"
              ]
            }
          },
          {
            "type": "paragraph",
            "data": 
            {
             "text": "&nbsp; The <code class=\"inline-code\">v-ripple</code> directive is used to show action from a user. It can be applied to any block level element. Numerous components come with the ripple directive built in, such as the <code class=\"inline-code\">v-btn</code><code class=\"inline-code\">v-tabs-item</code> and many more.&nbsp; for more info check <a href=\"http://vuetifyjs.com\">vuetify</a>"
            }
          },
          {
            "type" : "code",
            "data" : {
              "code": "drawView() {\n    let wrapper = document.createElement('div'),\n      textarea = document.createElement('textarea');\n\n    wrapper.classList.add(this.CSS.baseClass, this.CSS.wrapper);\n    textarea.classList.add(this.CSS.textarea, this.CSS.input);\n    textarea.textContent = this.data.code;\n\n    textarea.placeholder = this.placeholder;\n\n    wrapper.appendChild(textarea);\n\n    this.nodes.textarea = textarea;\n\n    return wrapper;\n  }"
            }
          },
          {
            "type": "warning",
            "data": {
              "title": "Note",
              "message": "Avoid using this method just for lulz. It can be very dangerous <a href=\"http://google.com\">opposite your daily fun</a><b> stuff.</b>"
            }
          }
        ],
        "version": "2.13.0"

      }
		}),
    computed: {
      
    },
    methods: {

    save: function() {
      this.editor.save().then(savedData => {
        console.log(savedData);
        this.value = savedData;
      });
    },
    myEditor: function() {
      this.editor = new EditorJS({
        holder: "codex-editor",
        autofocus: true,
        data: this.fakedata,
        /**
         * This Tool will be used as default
         */
        initialBlock: "paragraph",
        tools: {
          header: {
            class: Header,
            inlineToolbar: ['link'],
            shortcut: "CMD+SHIFT+H"
          },
          code: CodeTool,
          marker: Marker,
          inlineCode: InlineCode,
          raw: RawTool,
          list: {
            class: List,
            inlineToolbar: true,
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            config: {
              placeholder: "."
            }
          },
          
          warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
              titlePlaceholder: 'Title',
              messagePlaceholder: 'Message',
            },
          },
          
        },
        onReady: function() {
          console.log("ready");
        },
        onChange: function() {
          console.log("change");
        }
      });
    }
  },
  mounted() {
    this.myEditor()
   }

	}
</script>