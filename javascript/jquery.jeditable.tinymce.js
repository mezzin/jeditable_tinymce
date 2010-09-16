/*
 * TinyMCE input for Jeditable
 * Copyright (c) 2010 Justin Kieft (mezzin)
 * Based on work done by Mika Tuupola with his jeditable.wysiwyg plugin.
 * Copyright (c) 2008 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 * 
 * Depends on TinyMCE jquery plugin by 
 *   http://www.tinymce.org
 *
 * Project home:
 *   http://www.appelsiini.net/projects/jeditable
 */ 
$.editable.addInputType('tinymce', {
    /* Use default textarea instead of writing code here again. */
    element : function(settings, original) {
        /* Hide textarea to avoid flicker. */
        var textarea = $('<textarea>').css("opacity", "0");
        if (settings.rows) {
            textarea.attr('rows', settings.rows);
        } else {
            textarea.height(settings.height);
        }
        if (settings.cols) {
            textarea.attr('cols', settings.cols);
        } else {
            textarea.width(settings.width);
        }
        $(this).append(textarea);
        return(textarea);
    },
    content : function(string, settings, original) { 
        $('textarea', this).html(string);
    },
    plugin : function(settings, original) {
        var self = this;
        $('textarea', self).val($(original).context.revert);
        setTimeout(function() { $('textarea', self).tinymce({
        			script_url: 'http://tinymce.moxiecode.com/js/tinymce/jscripts/tiny_mce/tiny_mce_jquery.js',
        			theme : "advanced",
        			language : "en",
        		    theme : "advanced",
        		    skin : "o2k7",
        		    skin_variant : "silver",
        		    convert_urls : false,
        		    apply_source_formatting : true,
        		    plugins : "searchreplace,paste,spellchecker",
        		    theme_advanced_buttons1 : "cut,copy,paste,pasteword,separator,bold,italic,separator,bullist,numlist,separator,justifyleft,justifycenter,justifyright,justifyfull,separator,link,unlink,separator,removeformat",
        		    theme_advanced_buttons2 : "",
        		    theme_advanced_buttons3 : "",
        		    theme_advanced_toolbar_location : "top",
        		    theme_advanced_toolbar_align : "left"
       	});}, 0);
    },
    submit : function(settings, original) {
        var iframe         = $("iframe", this).get(0); 
        var inner_document = typeof(iframe.contentDocument) == 'undefined' ?  iframe.contentWindow.document.body : iframe.contentDocument.body;
        var new_content    = $(inner_document).html();
        $('textarea', this).val(new_content);
    }
});
